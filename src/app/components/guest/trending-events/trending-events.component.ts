import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventSchema } from '../../../../response-types';
import { EventComponent } from '../../event/event/event.component';
import { z } from 'zod';

/* eslint-disable @typescript-eslint/no-unused-vars */
const EventsSchema = z.array(EventSchema);

@Component({
  selector: 'app-trending-events',
  imports: [EventComponent],
  templateUrl: './trending-events.component.html',
  styleUrl: './trending-events.component.css',
})
export class TrendingEventsComponent implements OnInit {
  trendingEvents!: z.infer<typeof EventsSchema>;
  constructor(private eventService: EventService) {}
  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.trendingEvents = data;
    });
  }
}
