import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventSchema } from '../../../../response-types';
import { EventComponent } from '../../event/event/event.component';
import { z } from 'zod';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

/* eslint-disable @typescript-eslint/no-unused-vars */
const EventsSchema = z.array(EventSchema);

@Component({
  selector: 'app-guest-trending-events',
  imports: [EventComponent, AsyncPipe],
  templateUrl: './trending-events.component.html',
  styleUrl: './trending-events.component.css',
})
export class TrendingEventsComponent implements OnInit {
  trendingEvents$!: Observable<z.infer<typeof EventsSchema>>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.trendingEvents$ = this.eventService.getEvents().pipe(map(data => data.slice(0, 3)));
  }
}
