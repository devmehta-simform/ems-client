import { Component } from '@angular/core';
import { EventListComponent } from '../../event/event-list/event-list.component';

@Component({
  selector: 'app-explore',
  imports: [EventListComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent {}
