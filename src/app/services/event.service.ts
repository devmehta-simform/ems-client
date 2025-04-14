import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { Event } from '../../types';
import { EventSchema } from '../../models';
import { z } from 'zod';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = '/event';
  constructor(private httpClient: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.httpClient.get(environment.API_BASE_URL + this.baseUrl).pipe(
      map(response => {
        if ('data' in response) {
          const isEventArray = z.array(EventSchema).safeParse(response.data);
          if (isEventArray.success) return isEventArray.data;
          else throw Error('something went wrong');
        } else throw Error('something went wrong');
      }),
      catchError(err => {
        console.error(err);
        return [];
      })
    );
  }

  getEventById(eventId: string): Observable<Event> {
    return this.httpClient.get(environment.API_BASE_URL + this.baseUrl + `/${eventId}`).pipe(
      map(response => {
        if ('data' in response) {
          const isEvent = EventSchema.safeParse(response.data);
          if (isEvent.success) return isEvent.data;
          else throw Error('something went wrong');
        } else throw Error('something went wrong');
      }),
      catchError(err => {
        console.error(err);
        return [];
      })
    );
  }
}
