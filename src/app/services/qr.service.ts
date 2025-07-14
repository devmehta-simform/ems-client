import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { z } from 'zod';
import { QrCreateSchema } from '../../dto';
import { map, mergeMap, Observable, take, tap } from 'rxjs';
import { CloudinaryService } from './cloudinary.service';
import { TicketService } from './ticket.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private baseUrl = '/qr';

  constructor(
    private httpClient: HttpClient,
    private cloudinaryService: CloudinaryService,
    private ticketService: TicketService,
    private alertService: AlertService,
    private router: Router
  ) {}

  create(data: z.infer<typeof QrCreateSchema>) {
    this.httpClient
      .post(environment.API_BASE_URL + this.baseUrl, data, { responseType: 'arraybuffer' })
      .pipe(
        mergeMap(buf =>
          this.cloudinaryService.upload([new File([new Blob([buf], { type: 'application/pdf' })], 'tmp', { type: 'png' })], 'event_tickets')
        ),
        mergeMap(([qrCode]) =>
          qrCode
            ? this.ticketService
                .create(
                  {
                    userId: data.userId,
                    eventId: data.event.id,
                    qrCode,
                  },
                  data.qty
                )
                .pipe(
                  map(res => {
                    if (
                      res &&
                      'data' in res &&
                      res.data &&
                      typeof res.data === 'object' &&
                      'ticketId' in res.data &&
                      res.data.ticketId &&
                      typeof res.data.ticketId === 'string' &&
                      'userId' in res.data &&
                      res.data.userId &&
                      typeof res.data.userId === 'string'
                    ) {
                      return { ticketId: res.data.ticketId, userId: res.data.userId };
                    }
                    return null;
                  }),
                  tap(obj => {
                    if (obj) {
                      const { ticketId, userId } = obj;
                      this.alertService.show('ticket booked successfully!', 'success');
                      this.router.navigate(['/guest/my-tickets/' + ticketId], { state: { ids: { userId, ticketId } } });
                    }
                  })
                )
            : new Observable<undefined>()
        )
      )
      .pipe(take(1))
      .subscribe();
  }
}
