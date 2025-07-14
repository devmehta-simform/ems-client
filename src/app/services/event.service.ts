import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, debounceTime, map, mergeMap, Observable, take, tap } from 'rxjs';
import { EventSchema, EventDetailsSchema } from '../../response-types';
import { z } from 'zod';
import { CloudinaryService } from './cloudinary.service';
import { EventCreateDTO } from '../../dto';
import { AlertService } from './alert.service';

const EventsSchema = z.array(EventSchema);

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = '/event';
  private search$ = new BehaviorSubject<string>('');

  constructor(
    private httpClient: HttpClient,
    private cloudinaryService: CloudinaryService,
    private alertService: AlertService
  ) {}

  getSearch$() {
    return this.search$.pipe(
      debounceTime(1000),
      mergeMap(searchQuery => {
        return this.getEvents(searchQuery);
      })
    );
  }

  setSearch(searchQuery: string) {
    this.search$.next(searchQuery);
  }

  getEvents(searchQuery?: string): Observable<z.infer<typeof EventsSchema>> {
    return this.httpClient.get(environment.API_BASE_URL + this.baseUrl + `?searchQuery=${searchQuery ?? ''}`).pipe(
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
        if (response && typeof response === 'object' && 'data' in response && typeof response.data === 'object') {
          const isEvent = EventDetailsSchema.safeParse(response.data);
          if (isEvent.success) {
            return isEvent.data;
          } else throw Error('something went wrong');
        } else throw Error('something went wrong');
      }),
      catchError(err => {
        console.error(err);
        return [];
      })
    );
  }

  create(data: unknown, coverImage: File, images: File[]) {
    this.alertService.show('Now you may sit back and relax. Will notify when event is created', 'info');
    this.cloudinaryService
      .upload([coverImage, ...images])
      .pipe(
        take(1),
        mergeMap(urls => {
          if (data && typeof data === 'object') {
            const reqBody = EventCreateDTO.safeParse({ ...data, coverImage: urls.splice(0, 1)[0], images: urls });
            if (reqBody.success) return this.httpClient.post(environment.API_BASE_URL + this.baseUrl, reqBody.data).pipe(take(1));
          }
          return new Observable<undefined>();
        }),
        map(res => {
          if (res && typeof res === 'object' && 'data' in res && res.data && typeof res.data === 'object') return res.data;
          else return undefined;
        }),
        map(res => {
          console.log();
          const data = EventDetailsSchema.safeParse(res);
          if (data.success) {
            return data.data;
          }
          throw new Error(data.error.message);
        }),
        tap(() => this.alertService.show('event created successfully', 'success')),
        catchError(err => {
          console.error(err);
          return [];
        })
      )
      .subscribe();
  }
}
