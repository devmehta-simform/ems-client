import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Observable } from 'rxjs';
import { EventComponent } from '../event/event.component';
import { Event } from '../../../../models';
import { z } from 'zod';

@Component({
  selector: 'app-event-list',
  imports: [EventComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  event$!: Observable<unknown>;
  eventList!: z.infer<typeof Event>[];
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.event$ = this.eventService.getEvents();
    this.event$.subscribe(data => {
      if (!!data && typeof data === 'object' && 'data' in data) {
        const isEventArray = z.array(Event).safeParse(data.data);
        if (isEventArray.success) {
          this.eventList = [...isEventArray.data, ...isEventArray.data];
        }
      }
    });
  }
}
