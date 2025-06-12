import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { z } from 'zod';
import { TicketSchema } from '../../../../response-types/tickets';
import { TicketService } from '../../../services/ticket.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../pipes/cloudinary-image.pipe';

@Component({
  selector: 'app-guest-my-tickets',
  imports: [AsyncPipe, CloudinaryImagePipe, DatePipe, CurrencyPipe],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css',
})
export class MyTicketsComponent {
  tickets$: Observable<z.infer<typeof TicketSchema>[]>;

  constructor(private ticketService: TicketService) {
    this.tickets$ = this.ticketService.getAllTicketsForUser();
  }
}
