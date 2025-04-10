import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = '/event';
  constructor(private httpClient: HttpClient) {}

  getEvents(): Observable<unknown> {
    return this.httpClient.get(environment.API_BASE_URL + this.baseUrl);
  }
}
