import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

 
  // STATISTICS
 

  stats = [
    {
      title: 'Total Users',
      value: 0,
      change: 0,
      icon: 'people'
    },
    {
      title: 'Total Jobs',
      value: 0,
      change: 0,
      icon: 'work'
    },
    {
      title: 'Total Applications',
      value: 0,
      change: 0,
      icon: 'description'
    },
    {
      title: 'Total Companies',
      value: 0,
      change: 0,
      icon: 'business'
    }
  ];
 
  // RECENT USERS
  recentUsers: any[] = [];

  // RECENT JOBS
  recentJobs: any[] = [];

  // PLATFORM ACTIVITY

  activity = {
    new_users: 0,
    new_jobs: 0,
    applications: 0,
    new_companies: 0
  };


  loading = false;


  constructor(
    private adminService: AdminService
  ) {}


 
  // INITIALIZE
 
  ngOnInit(): void {

    this.loadDashboard();

  }

  // LOAD DASHBOARD
 
  loadDashboard(): void {
    this.loading = true;
    this.adminService.getDashboard().subscribe({
      next: (response: any) => {

        // Statistics
        const stats = response.stats || {};

        this.stats = [
          {
            title: 'Total Users',
            value: Number(stats.total_users) || 0,
            change: Number(response.activity?.new_users) || 0,
            icon: 'people'
          },

          {
            title: 'Total Jobs',
            value: Number(stats.total_jobs) || 0,
            change: Number(response.activity?.new_jobs) || 0,
            icon: 'work'
          },

          {
            title: 'Total Applications',
            value: Number(stats.total_applications) || 0,
            change: Number(response.activity?.applications) || 0,
            icon: 'description'
          },

          {
            title: 'Total Companies',
            value: Number(stats.total_companies) || 0,
            change: Number(response.activity?.new_companies) || 0,
            icon: 'business'
          }

        ];


      
        // Recent Users
        this.recentUsers = response.recentUsers || [];


      
        // Recent Jobs
        this.recentJobs = response.recentJobs || [];
       
      
        // Platform Activity
      
        this.activity = {

          new_users:Number(response.activity?.new_users) || 0,

          new_jobs:Number(response.activity?.new_jobs) || 0,

          applications: Number(response.activity?.applications) || 0,

          new_companies:Number(response.activity?.new_companies) || 0

        };


        this.loading = false;

      },

      error: (error) => {

        console.error(
          'Failed to load admin dashboard:',
          error
        );

        this.loading = false;

      }

    });

  }


 
  // USER NAME
 

  getUserName(user: any): string {
    if (!user) {
      return '';
    }

    const firstName = user.first_name || '';
    const lastName =user.last_name || '';

    return `${firstName} ${lastName}`.trim();

  }


 
  // USER ROLE
 

  getRoleText(userType: string): string {

    switch (userType) {

      case 'JOB_SEEKER':
        return 'Job Seeker';

      case 'RECRUITER':
        return 'Recruiter';

      case 'ADMIN':
        return 'Admin';

      default:
        return userType;

    }

  }


 
  // USER AVATAR
 

  getInitial(user: any): string {

    if (!user) {
      return '?';
    }

    const firstName =user.first_name || '';

    const lastName =user.last_name || '';

    if (firstName && lastName) {
      return (
        firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

    }

    if (firstName) {
      return firstName.charAt(0).toUpperCase();

    }

    if (lastName) {
      return lastName.charAt(0).toUpperCase();

    }
    return '?';

  }

}