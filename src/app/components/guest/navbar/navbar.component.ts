import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-guest-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  handleLogout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }
}
