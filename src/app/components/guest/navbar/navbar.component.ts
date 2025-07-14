import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserLoginSchema } from '../../../../response-types';
import { DataStoreService } from '../../../services/data-store.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-guest-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  username: string | null;
  avatar: string | null;

  constructor(
    private userService: UserService,
    private router: Router,
    private dataStoreService: DataStoreService,
    private eventService: EventService
  ) {
    const user = UserLoginSchema.safeParse(this.dataStoreService.getData('user'));
    if (user.success) {
      this.username = user.data.name || null;
      this.avatar = user.data.avatar || null;
    } else {
      this.username = null;
      this.avatar = null;
    }
  }

  handleSearch(event: Event) {
    const el = event.target;
    if (el instanceof HTMLInputElement) {
      this.eventService.setSearch(el.value);
    }
  }

  handleLogout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }
}
