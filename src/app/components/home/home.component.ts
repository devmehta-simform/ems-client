import { Component } from '@angular/core';
import { EventListComponent } from '../event/event-list/event-list.component';

@Component({
  selector: 'app-home',
  imports: [EventListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
