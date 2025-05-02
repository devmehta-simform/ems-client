import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, mergeMap, Observable } from 'rxjs';
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

  constructor(
    private httpClient: HttpClient,
    private cloudinaryService: CloudinaryService,
    private alertService: AlertService
  ) {}

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
        if (response && typeof response === 'object' && 'data' in response && typeof response.data === 'object') {
          const isEvent = EventDetailsSchema.safeParse({ ...response.data, duration: 0 });
          // console.log(isEvent.error);
          if (isEvent.success) {
            const startTime = new Date(isEvent.data.startTime);
            const endTime = new Date(isEvent.data.endTime);
            const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
            console.log(startTime, endTime, duration);
            return { ...isEvent.data, duration };
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
        mergeMap(urls => {
          if (data && typeof data === 'object') {
            const reqBody = EventCreateDTO.safeParse({ ...data, coverImage: urls.splice(0, 1)[0], images: urls });
            if (reqBody.success) return this.httpClient.post(environment.API_BASE_URL + this.baseUrl, reqBody.data);
          }
          return new Observable<undefined>();
        }),
        map(res => {
          if (res && typeof res === 'object' && 'data' in res && res.data && typeof res.data === 'object') return { ...res.data, duration: 0 };
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
        catchError(err => {
          console.error(err);
          return [];
        })
      )
      .subscribe(() => {
        this.alertService.show('event created successfully', 'success');
      });
  }
}
