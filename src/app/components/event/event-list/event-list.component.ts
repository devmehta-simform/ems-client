import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { EventComponent } from '../event/event.component';
import { EventSchema } from '../../../../response-types';
import { z } from 'zod';
import { LoaderService } from '../../../services/loader.service';
import { finalize } from 'rxjs';

/* eslint-disable @typescript-eslint/no-unused-vars */
const EventsSchema = z.array(EventSchema);

@Component({
  selector: 'app-event-list',
  imports: [EventComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  eventList!: z.infer<typeof EventsSchema>;
  currentIndex = 0;
  constructor(
    private loaderService: LoaderService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.eventService
      .getEvents()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(data => {
        this.eventList = [...data];
        this.eventList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      });
  }

  prevSlide() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.eventList.length - 1;
    this.scrollToCurrentSlide();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.eventList.length;
    this.scrollToCurrentSlide();
  }

  scrollToCurrentSlide() {
    const element = document.getElementById('slide' + this.currentIndex);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }
}
