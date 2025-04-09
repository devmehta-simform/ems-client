import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = '/event';
  constructor(private httpClient: HttpClient) {}

  getEvents() {
    return this.httpClient.get(environment.API_BASE_URL + this.baseUrl);
  }
}
