import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { z } from 'zod';
import { QrCreateSchema } from '../../dto';
import { mergeMap, Observable } from 'rxjs';
import { CloudinaryService } from './cloudinary.service';
import { TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private baseUrl = '/qr';

  constructor(
    private httpClient: HttpClient,
    private cloudinaryService: CloudinaryService,
    private ticketService: TicketService
  ) {}

  create(data: z.infer<typeof QrCreateSchema>) {
    console.log('create qr');
    this.httpClient
      .post(environment.API_BASE_URL + this.baseUrl, data, { responseType: 'arraybuffer' })
      .pipe(
        mergeMap(buf =>
          this.cloudinaryService.upload([new File([new Blob([buf], { type: 'application/pdf' })], 'tmp', { type: 'png' })], 'event_tickets')
        ),
        mergeMap(([qrCode]) =>
          qrCode
            ? this.ticketService.create({
                userId: data.userId,
                eventId: data.event.id,
                qrCode,
              })
            : new Observable<undefined>()
        )
      )
      .subscribe(data => console.log(data));
  }
}
