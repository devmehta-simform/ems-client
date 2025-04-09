import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  imports: [],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  event$!: Observable<object>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.event$ = this.eventService.getEvents();
    this.event$.subscribe(data => console.log(data));
  }
}
