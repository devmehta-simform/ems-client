import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { z } from 'zod';
import { EventSchema } from '../../../../response-types/event';
import { EventService } from '../../../services/event.service';
import { UserService } from '../../../services/user.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { CloudinaryImagePipe } from '../../../pipes/cloudinary-image.pipe';
import { RouterLink } from '@angular/router';
import { ImgFallbackDirective } from '../../../directives/img-fallback.directive';

@Component({
  selector: 'app-host-my-events',
  standalone: true,
  imports: [AsyncPipe, CloudinaryImagePipe, DatePipe, CurrencyPipe, RouterLink, ImgFallbackDirective],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css',
})
export class MyEventsComponent {
  events$: Observable<z.infer<typeof EventSchema>[]>;

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {
    this.events$ = this.eventService.getEventsForUser();
  }
}
