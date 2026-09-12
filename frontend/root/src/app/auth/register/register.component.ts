import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 registerData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userType: ''
};

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  selectRole(role: string): void {
    this.registerData.userType = role;
  }

  register(): void {

  // Check required fields
  if (
    !this.registerData.first_name ||
    !this.registerData.email ||
    !this.registerData.password ||
    !this.registerData.confirmPassword
  ) {
    alert('Please fill all required fields');
    return;
  }

  // Check role
  if (!this.registerData.userType) {
    alert('Please select your role');
    return;
  }

  // Check password
  if (
    this.registerData.password !==
    this.registerData.confirmPassword
  ) {
    alert('Passwords do not match');
    return;
  }

  console.log('Register Data:', this.registerData);


  // Data expected by backend
  const userData = {
    first_name: this.registerData.first_name,
    last_name: this.registerData.last_name,
    email: this.registerData.email,
    phone: this.registerData.phone,
    password: this.registerData.password,
    user_type: this.registerData.userType
  };


  console.log('Data sent to backend:', userData);


  // Call backend
  this.authService.register(userData).subscribe({

    next: (response) => {

      console.log('Registration successful:', response);

      alert('Registration successful!');

      this.router.navigate(['/']);

    },

    error: (error) => {

      console.log('Registration failed:', error);

      alert(
        error.error?.message ||
        'Registration failed'
      );

    }

  });
}

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}