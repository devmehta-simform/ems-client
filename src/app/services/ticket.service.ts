import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { z } from 'zod';
import { TicketCreateSchema } from '../../dto/ticketCreateDTO';
import { DataStoreService } from './data-store.service';
import { map } from 'rxjs';
import { TicketSchema } from '../../response-types/tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseUrl = '/ticket';

  constructor(
    private httpClient: HttpClient,
    private dataStoreService: DataStoreService
  ) {}

  create(data: z.infer<typeof TicketCreateSchema>) {
    return this.httpClient.post(environment.API_BASE_URL + this.baseUrl, data);
  }

  getAllTicketsForUser() {
    return this.httpClient.get(environment.API_BASE_URL + this.baseUrl + '/' + this.dataStoreService.getData('user').id).pipe(
      map(data => {
        const res = z.array(TicketSchema).safeParse(data);
        if (res.error) {
          throw Error('something went wrong');
        }
        return res.data;
      })
    );
  }
}
