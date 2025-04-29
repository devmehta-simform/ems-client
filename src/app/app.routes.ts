import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent as GuestHomeComponent } from './components/guest/home/home.component';
import { ExploreComponent } from './components/guest/explore/explore.component';
import { UpcomingEventsComponent } from './components/guest/upcoming-events/upcoming-events.component';
import { MyTicketsComponent } from './components/guest/my-tickets/my-tickets.component';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';
import { HomeComponent as HostHomeComponent } from './components/host/home/home.component';
import { DashboardComponent as HostDashboardComponent } from './components/host/dashboard/dashboard.component';
import { CreateEventComponent as HostCreateEventComponent } from './components/host/create-event/create-event.component';
// import { roleGuard } from './guards/role.guard';
// import { RolesEnum } from '../response-types';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Auth',
  },
  {
    path: 'guest',
    component: GuestHomeComponent,
    // canActivate: [roleGuard],
    // data: {
    //   role: RolesEnum.Guest,
    // },
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
  {
    path: 'host',
    component: HostHomeComponent,
    // canActivate: [roleGuard],
    // data: {
    //   role: RolesEnum.Host,
    // },
    children: [
      {
        path: 'dashboard',
        component: HostDashboardComponent,
        title: 'dashboard',
      },
      {
        path: 'create-event',
        component: HostCreateEventComponent,
        title: 'create event',
      },
    ],
    title: 'Home',
  },
];
