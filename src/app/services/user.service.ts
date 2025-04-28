import { inject, Injectable } from '@angular/core';
import { UserLoginSchema, UserRegisterSchema } from '../../dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { z } from 'zod';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { DataStoreService } from './data-store.service';
import { UserLoginSchema as UserLoginResponseSchema } from '../../response-types';
import { LoaderService } from './loader.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/user';
  private dataStoreService = inject(DataStoreService);
  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) {}
  register(user: z.infer<typeof UserRegisterSchema>) {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/register', user).pipe(finalize(() => this.loaderService.hide()));
  }
  login(user: z.infer<typeof UserLoginSchema>): Observable<z.infer<typeof UserLoginResponseSchema>> {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/login', user).pipe(
      tap(res => {
        if ('data' in res) {
          this.dataStoreService.addData('user', res.data);
        }
      }),
      map(response => {
        if ('data' in response) {
          const user = UserLoginResponseSchema.safeParse(response.data);
          if (user.success) return user.data;
          else throw Error('something went wrong');
        } else throw Error('something went wrong');
      }),
      catchError(err => {
        console.error(err);
        return [];
      }),
      finalize(() => this.loaderService.hide())
    );
  }
  logout() {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/logout', {}).subscribe();
  }
}
