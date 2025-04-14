import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../../../types';
import { EventService } from '../../../services/event.service';
import { LoaderService } from '../../../services/loader.service';
import { finalize, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-event-details',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent implements OnInit {
  event$!: Observable<Event>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private loaderService: LoaderService
  ) {}
  ngOnInit() {
    this.loaderService.show();
    const eventId = this.activatedRoute.snapshot.params['eventId'];
    this.event$ = this.eventService.getEventById(eventId).pipe(finalize(() => this.loaderService.hide()));
  }
}
