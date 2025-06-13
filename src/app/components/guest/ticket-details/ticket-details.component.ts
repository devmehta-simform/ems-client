import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { z } from 'zod';
import { TicketSchema } from '../../../../response-types/tickets';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../pipes/cloudinary-image.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TimeDurationPipe } from '../../../pipes/time-duration.pipe';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-details',
  imports: [AsyncPipe, DatePipe, CloudinaryImagePipe, RouterLink, ClipboardModule, TimeDurationPipe, DecimalPipe],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css',
})
export class TicketDetailsComponent {
  ticket$: Observable<z.infer<typeof TicketSchema>>;
  constructor(
    private router: Router,
    private ticketService: TicketService
  ) {
    const ticket = this.router.getCurrentNavigation()?.extras?.state?.['ticket'];
    if (ticket) this.ticket$ = of(ticket);
    else {
      const ids = this.router.getCurrentNavigation()?.extras?.state?.['ids'];
      this.ticket$ = this.ticketService.getTicket(ids?.ticketId, ids?.userId);
    }
  }
}
