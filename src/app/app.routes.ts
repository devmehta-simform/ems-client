import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/guest/home/home.component';
import { ExploreComponent } from './components/guest/explore/explore.component';
import { UpcomingEventsComponent } from './components/guest/upcoming-events/upcoming-events.component';
import { MyTicketsComponent } from './components/guest/my-tickets/my-tickets.component';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Auth',
  },
  {
    path: 'guest',
    component: HomeComponent,
    children: [
      {
        path: 'explore',
        component: ExploreComponent,
        title: 'explore',
      },
      {
        path: 'upcoming-events',
        component: UpcomingEventsComponent,
        title: 'upcoming-events',
      },
      {
        path: 'my-tickets',
        component: MyTicketsComponent,
        title: 'my-tickets',
      },
      {
        path: 'event-details/:eventId',
        component: EventDetailsComponent,
        title: 'event-details',
      },
    ],
    title: 'Home',
  },
];
