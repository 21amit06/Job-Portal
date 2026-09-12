import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-navbar',
  imports: [   CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css'
})
export class SideNavbarComponent {
  
  userType: string = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const user = localStorage.getItem('user');

    console.log('User from localStorage:', user);

    if (user) {

      const userData = JSON.parse(user);

      console.log('User Type:', userData.user_type);

      this.userType = userData.user_type;

    }

  }


  logout(): void {

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['/']);

  }
}
