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
  currentIndex = 1;
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.eventList = [...data, ...data];
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
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }
}
