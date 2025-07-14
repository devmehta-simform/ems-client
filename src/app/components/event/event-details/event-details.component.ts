import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventDetailsSchema } from '../../../../response-types';
import { EventService } from '../../../services/event.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { z } from 'zod';
import { ImgFallbackDirective } from '../../../directives/img-fallback.directive';
import { CloudinaryImagePipe } from '../../../pipes/cloudinary-image.pipe';
import { TimeDurationPipe } from '../../../pipes/time-duration.pipe';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-event-details',
  imports: [AsyncPipe, CommonModule, ImgFallbackDirective, CurrencyPipe, CloudinaryImagePipe, RouterLink, TimeDurationPipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent implements OnInit {
  event$!: Observable<z.infer<typeof EventDetailsSchema>>;
  canEdit = false;
  eventData!: z.infer<typeof EventDetailsSchema>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params['eventId'];
    this.event$ = this.eventService.getEventById(eventId);
    this.event$.subscribe(event => {
      this.eventData = event;
      const user = this.userService['dataStoreService'].getData('user');
      this.canEdit = user && user.role === 'Host' && user.id === event.userId;
    });
  }

  editEvent() {
    this.router.navigate(['/host/create-event'], {
      state: { event: this.eventData, operation: 'update' },
    });
  }
}
