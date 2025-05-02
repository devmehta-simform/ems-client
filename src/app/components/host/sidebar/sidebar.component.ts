import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserLoginSchema } from '../../../../response-types';
import { DataStoreService } from '../../../services/data-store.service';

@Component({
  selector: 'app-host-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isVisible = false;
  username: string | null;
  avatar: string | null;
  constructor(
    private userService: UserService,
    private router: Router,
    private dataStoreService: DataStoreService
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

  logoutUser() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }
}
