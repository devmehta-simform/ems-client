import { Injectable } from '@angular/core';
import { UserLoginSchema, UserRegisterSchema } from '../../dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { z } from 'zod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/user';
  private ob$ = new Observable();
  constructor(private httpClient: HttpClient) {}
  register(user: z.infer<typeof UserRegisterSchema>) {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/register', user);
  }
  login(user: z.infer<typeof UserLoginSchema>) {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl + '/login', user);
  }
}
