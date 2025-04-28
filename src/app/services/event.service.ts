import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { EventDetailsSchema, EventSchema } from '../../response-types';
import { z } from 'zod';

const EventsSchema = z.array(EventSchema);

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = '/event';
  constructor(private httpClient: HttpClient) {}

  getEvents(): Observable<z.infer<typeof EventsSchema>> {
    return this.httpClient.get(environment.API_BASE_URL + this.baseUrl).pipe(
      map(response => {
        if ('data' in response) {
          const isEventArray = EventsSchema.safeParse(response.data);
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

  getEventById(eventId: string): Observable<z.infer<typeof EventDetailsSchema>> {
    return this.httpClient.get(environment.API_BASE_URL + this.baseUrl + `/${eventId}`).pipe(
      map(response => {
        if ('data' in response) {
          const isEvent = EventDetailsSchema.safeParse(response.data);
          // console.log(isEvent.error);
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
