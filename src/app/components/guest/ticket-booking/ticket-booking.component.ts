import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { z } from 'zod';
import { EventDetailsSchema } from '../../../../response-types';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { DataStoreService } from '../../../services/data-store.service';
import { UserLoginSchema as UserLoginResponseSchema } from '../../../../response-types';
import { FormsModule } from '@angular/forms';
import { QrService } from '../../../services/qr.service';

@Component({
  selector: 'app-guest-ticket-booking',
  imports: [AsyncPipe, DatePipe, CurrencyPipe, FormsModule],
  templateUrl: './ticket-booking.component.html',
  styleUrl: './ticket-booking.component.css',
})
export class TicketBookingComponent {
  event$: Observable<z.infer<typeof EventDetailsSchema>>;
  user: z.infer<typeof UserLoginResponseSchema>;
  qty = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private qrService: QrService
  ) {
    this.event$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state.event));
    this.user = this.dataStoreService.getData('user');
  }

  handlePurchase(event: z.infer<typeof EventDetailsSchema>) {
    this.qrService.create({
      event,
      qty: this.qty,
      userEmail: this.user.email,
      userId: this.user.id,
      userName: this.user.name,
    });
  }
}
