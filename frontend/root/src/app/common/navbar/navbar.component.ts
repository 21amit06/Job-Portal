import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: any;

  constructor(private authService: AuthService) {

    this.user = this.authService.getUser();

  }


  // =========================
  // USER INITIALS
  // =========================

  getUserInitials(): string {

    if (!this.user) {
      return '';
    }

    const firstName = this.user.first_name || '';
    const lastName = this.user.last_name || '';

    const initials =
      firstName.charAt(0) +
      lastName.charAt(0);

    return initials.toUpperCase();
  }


  // =========================
  // USER NAME
  // =========================

  getUserName(): string {

    if (!this.user) {
      return '';
    }

    const firstName = this.user.first_name || '';
    const lastName = this.user.last_name || '';

    return `${firstName} ${lastName}`.trim();
  }


  // =========================
  // USER ROLE
  // =========================

  getUserRole(): string {

    switch (this.user?.user_type) {

      case 'JOB_SEEKER':
        return 'Job Seeker';

      case 'RECRUITER':
        return 'Recruiter';

      case 'ADMIN':
        return 'Admin';

      default:
        return '';
    }
  }

}