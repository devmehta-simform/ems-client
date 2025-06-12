import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { z } from 'zod';
import { TicketSchema } from '../../../../response-types/tickets';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../pipes/cloudinary-image.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TimeDurationPipe } from '../../../pipes/time-duration.pipe';

@Component({
  selector: 'app-ticket-details',
  imports: [AsyncPipe, DatePipe, CloudinaryImagePipe, RouterLink, ClipboardModule, TimeDurationPipe, DecimalPipe],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css',
})
export class TicketDetailsComponent {
  ticket$: Observable<z.infer<typeof TicketSchema>>;
  constructor(private activatedRoute: ActivatedRoute) {
    this.ticket$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state.ticket));
  }
}
