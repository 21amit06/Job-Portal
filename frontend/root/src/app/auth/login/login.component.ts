import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Router } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',

  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Your HTML uses loginData.email and loginData.password
  loginData = {
    email: '',
    password: ''
  };

  // Your HTML uses hidePassword
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    console.log('Login data:', this.loginData);

    this.authService.login(this.loginData).subscribe({

      next: (response) => {

        console.log('Login successful:', response);

        // Save token and user
        this.authService.saveLoginData(response);

        const userType = response.user.user_type;

        // Job Seeker
        if (userType === 'JOB_SEEKER') {

          this.router.navigate([
            '/jobseekers/dashboard'
          ]);

        }

        // Recruiter
        else if (userType === 'RECRUITER') {

          this.router.navigate([
            '/recuriter/dashboard'
          ]);

        }

        // Admin
        else if (userType === 'ADMIN') {

          this.router.navigate([
            '/admin/dashboard'
          ]);

        }

      },

      error: (error) => {

        console.log('Login failed:', error);

      }

    });
  }

  goToRegister(): void {

    this.router.navigate(['/register']);

  }
}