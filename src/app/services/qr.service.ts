import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { z } from 'zod';
import { QrCreateSchema } from '../../dto';
import { mergeMap } from 'rxjs';
import { CloudinaryService } from './cloudinary.service';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private baseUrl = '/qr';

  constructor(
    private httpClient: HttpClient,
    private cloudinaryService: CloudinaryService
  ) {}

  create(data: z.infer<typeof QrCreateSchema>) {
    console.log('create qr');
    this.httpClient
      .post(environment.API_BASE_URL + this.baseUrl, data, { responseType: 'arraybuffer' })
      .pipe(
        mergeMap(data =>
          this.cloudinaryService.upload([new File([new Blob([data], { type: 'application/pdf' })], 'tmp', { type: 'png' })], 'event_tickets')
        )
      )
      .subscribe(data => console.log(data));
  }
}
