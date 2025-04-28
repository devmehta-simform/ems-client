import { inject, Injectable } from '@angular/core';
import { UserLoginSchema, UserRegisterSchema } from '../../dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { z } from 'zod';
import { tap } from 'rxjs';
import { DataStoreService } from './data-store.service';

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
  login(user: z.infer<typeof UserLoginSchema>) {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/login', user).pipe(
      tap(res => {
        if ('data' in res) {
          this.dataStoreService.addData('user', res.data);
        }
      })
    );
  }
  logout() {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/logout', {}).subscribe();
  }
}
