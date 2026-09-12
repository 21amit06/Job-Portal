import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    FlexLayoutModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class JobseekersProfileComponent implements OnInit {

  isEditing = false;

  profile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    headline: '',
    bio: '',
    experience: '',
    education: '',
    university: '',
    skills: [] as string[]
  };

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.loadProfile();

  }



  // LOAD PROFILE FROM DATABASE


  loadProfile(): void {
    this.authService.getMyProfile().subscribe({
      next: (response: any) => {
        const user = response.user;
        if (!user) {
          return;
        }

        this.profile.firstName =user.first_name || '';
        this.profile.lastName =user.last_name || '';
        this.profile.email =user.email || '';
        this.profile.phone =user.phone || '';

      },

      error: (error) => {
        console.log(
          'Error loading profile:',
          error
        );

      }

    });

  }



  // EDIT PROFILE
  toggleEdit(): void {
    this.isEditing = !this.isEditing;

  }



  // SAVE PROFILE


  saveProfile(): void {
    this.isEditing = false;

    console.log(
      'Profile saved:',
      this.profile
    );

  }



  // REMOVE SKILL


  removeSkill(skill: string): void {
    this.profile.skills =
      this.profile.skills.filter(
        item => item !== skill
      );

  }



  // ADD SKILL


  addSkill(): void {
    const skill = prompt(
      'Enter skill name'
    );

    if (skill && skill.trim()) {

      this.profile.skills.push(
        skill.trim()
      );

    }

  }

}