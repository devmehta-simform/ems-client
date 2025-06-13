import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventDetailsSchema } from '../../../../response-types';
import { EventService } from '../../../services/event.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { z } from 'zod';
import { ImgFallbackDirective } from '../../../directives/img-fallback.directive';
import { CloudinaryImagePipe } from '../../../pipes/cloudinary-image.pipe';
import { TimeDurationPipe } from '../../../pipes/time-duration.pipe';

@Component({
  selector: 'app-event-details',
  imports: [AsyncPipe, CommonModule, ImgFallbackDirective, CurrencyPipe, CloudinaryImagePipe, RouterLink, TimeDurationPipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent implements OnInit {
  event$!: Observable<z.infer<typeof EventDetailsSchema>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params['eventId'];
    this.event$ = this.eventService.getEventById(eventId);
  }
}
