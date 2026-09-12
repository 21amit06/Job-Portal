import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
//import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';
import { InterviewService } from '../../services/interview.service';
import { JobService } from '../../services/job.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    
    FlexLayoutModule
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class JobseekersDashboardComponent {
   userName = '';

  applications: any[] = [];
  interviews: any[] = [];
  jobs: any[] = [];

  applicationCount = 0;
  interviewCount = 0;
  offerCount = 0;
  savedJobCount = 0;

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationService,
    private interviewService: InterviewService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {

    const user = this.authService.getUser();

    if (user) {
      this.userName = user.name;
    }

    this.loadApplications();
    this.loadInterviews();
    this.loadJobs();
  }

  loadApplications(): void {

    this.applicationService.getMyApplications().subscribe({
      next: (response: any) => {
        this.applications = response.applications || [];

        this.applicationCount = this.applications.length;

        this.offerCount = this.applications.filter(
          application => application.status === 'SELECTED'
        ).length;

      },
      error: (error) => {
        console.error('Failed to load applications:',error);

      }

    });

  }

  loadInterviews(): void {

    this.interviewService.getMyInterviews().subscribe({
      next: (response: any) => {
        this.interviews = response.interviews || [];

        this.interviewCount = this.interviews.length;

      },

      error: (error) => {

        console.error(
          'Failed to load interviews:',
          error
        );

      }

    });

  }

  loadJobs(): void {

    this.jobService.getAllJobs().subscribe({
      next: (response: any) => {

        this.jobs = response.jobs?.slice(0,5) || [];

      },

      error: (error) => {

        console.error(
          'Failed to load jobs:',
          error
        );

      }

    });

  }

}
