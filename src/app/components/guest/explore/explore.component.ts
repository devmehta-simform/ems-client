import { Component } from '@angular/core';
import { EventListComponent } from '../../event/event-list/event-list.component';
import { TrendingEventsComponent } from '../trending-events/trending-events.component';

@Component({
  selector: 'app-explore',
  imports: [EventListComponent, TrendingEventsComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent {}
