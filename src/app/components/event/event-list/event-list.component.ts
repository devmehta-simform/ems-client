import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventComponent } from '../event/event.component';
import { Event } from '../../../../types';

@Component({
  selector: 'app-event-list',
  imports: [EventComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  eventList!: Event[];
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.eventList = [...data, ...data];
    });
  }
}
