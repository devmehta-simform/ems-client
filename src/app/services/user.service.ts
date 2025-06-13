import { inject, Injectable } from '@angular/core';
import { UserLoginSchema, UserRegisterSchema } from '../../dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { z } from 'zod';
import { catchError, map, Observable, take } from 'rxjs';
import { DataStoreService } from './data-store.service';
import { UserLoginSchema as UserLoginResponseSchema } from '../../response-types';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/user';
  private dataStoreService = inject(DataStoreService);
  constructor(private httpClient: HttpClient) {}
  register(user: z.infer<typeof UserRegisterSchema>) {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/register', user);
  }
  login(user: z.infer<typeof UserLoginSchema>): Observable<z.infer<typeof UserLoginResponseSchema>> {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/login', user).pipe(
      map(response => {
        if ('data' in response) {
          const user = UserLoginResponseSchema.safeParse(response.data);
          if (user.success) {
            this.dataStoreService.addData('user', response.data);
            return user.data;
          } else throw Error('something went wrong');
        } else throw Error('something went wrong');
      }),
      catchError(err => {
        console.error(err);
        return [];
      })
    );
  }
  logout() {
    localStorage.clear();
    return this.httpClient
      .post(environment.API_BASE_URL + this.baseUrl + '/logout', {})
      .pipe(take(1))
      .subscribe();
  }
}
