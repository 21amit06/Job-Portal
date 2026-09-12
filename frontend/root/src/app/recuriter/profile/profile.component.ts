import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

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
    MatSelectModule,

    FlexLayoutModule
  ],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class RecuriterProfileComponent implements OnInit {

  isEditing = false;

  recruiter: any = {

    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    companyName: '',
    industry: '',
    companySize: '',
    location: '',
    website: '',

    about: ''

  };

  constructor(
    private authService: AuthService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {

    this.loadProfile();

  }

  // =========================
  // LOAD PROFILE
  // =========================

  loadProfile(): void {

    // Load personal user information
    const user = this.authService.getUser();

    console.log('Logged user:', user);

    if (user) {

      this.recruiter.firstName =
        user.first_name || '';

      this.recruiter.lastName =
        user.last_name || '';

      this.recruiter.email =
        user.email || '';

      this.recruiter.phone =
        user.phone || '';

    }


    // Load company information
    this.companyService.getMyCompany().subscribe({

      next: (response: any) => {

        console.log(
          'Company profile response:',
          response
        );

        const company = response.company;

        if (!company) {
          return;
        }

        this.recruiter = {

          ...this.recruiter,

          companyName:
            company.company_name || '',

          industry:
            company.industry || '',

          companySize:
            company.company_size || '',

          location:
            company.location || '',

          website:
            company.website || '',

          about:
            company.description || ''

        };

      },

      error: (error) => {

        console.log(
          'Error loading company profile:',
          error
        );

      }

    });

  }

  // =========================
  // ENABLE / DISABLE EDITING
  // =========================

  toggleEdit(): void {

    this.isEditing = !this.isEditing;

  }

  // =========================
  // SAVE PROFILE
  // =========================

  saveProfile(): void {

    const companyData = {

      company_name:
        this.recruiter.companyName,

      industry:
        this.recruiter.industry,

      company_size:
        this.recruiter.companySize,

      location:
        this.recruiter.location,

      website:
        this.recruiter.website,

      description:
        this.recruiter.about

    };

    this.companyService
      .updateMyCompany(companyData)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Profile updated:',
            response
          );

          const company =
            response.company;

          this.recruiter = {

            ...this.recruiter,

            companyName:
              company.company_name || '',

            industry:
              company.industry || '',

            companySize:
              company.company_size || '',

            location:
              company.location || '',

            website:
              company.website || '',

            about:
              company.description || ''

          };

          this.isEditing = false;

        },

        error: (error) => {

          console.log(
            'Error updating profile:',
            error
          );

        }

      });

  }

}