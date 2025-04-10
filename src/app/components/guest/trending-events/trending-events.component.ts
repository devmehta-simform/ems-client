import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../../types';
import { EventComponent } from '../../event/event/event.component';

@Component({
  selector: 'app-trending-events',
  imports: [EventComponent],
  templateUrl: './trending-events.component.html',
  styleUrl: './trending-events.component.css',
})
export class TrendingEventsComponent implements OnInit {
  trendingEvents!: Event[];
  constructor(private eventService: EventService) {}
  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.trendingEvents = data;
    });
  }
}
