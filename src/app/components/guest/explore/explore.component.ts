import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { EventListComponent } from '../../event/event-list/event-list.component';
import { TrendingEventsComponent } from '../trending-events/trending-events.component';

@Component({
  selector: 'app-guest-explore',
  imports: [EventListComponent, TrendingEventsComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent implements AfterViewInit {
  @ViewChild(EventListComponent) eventListComponent!: EventListComponent;
  isSearchMode = false;

  ngAfterViewInit() {
    if (this.eventListComponent) {
      // Use a MutationObserver or polling since isSearchMode is set asynchronously
      setInterval(() => {
        this.isSearchMode = this.eventListComponent['isSearchMode'];
      }, 200);
    }
  }
}
