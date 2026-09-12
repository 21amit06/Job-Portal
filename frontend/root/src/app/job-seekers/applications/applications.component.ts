import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { ApplicationService } from '../../services/application.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-applications',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class JobseekersApplicationsComponent implements OnInit {

  selectedStatus = 'All';

  applications: any[] = [];

  constructor(
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }


  // Load applications from database

  loadApplications(): void {

    this.applicationService.getMyApplications().subscribe({

      next: (response: any) => {

        console.log('My applications from DB:', response);

        this.applications = response.applications || [];

      },

      error: (error) => {

        console.error(
          'Failed to load applications:',
          error
        );

      }

    });

  }


  // Filter applications according to selected status

  get filteredApplications() {

    if (this.selectedStatus === 'All') {

      return this.applications;

    }

    return this.applications.filter(

      application =>
        application.status === this.selectedStatus

    );

  }


  // Select tab

  selectStatus(status: string): void {

    this.selectedStatus = status;

  }


  // Count applications

  getCount(status: string): number {

    return this.applications.filter(

      application =>
        application.status === status

    ).length;

  }


  // Status CSS class

  getStatusClass(status: string): string {

    switch (status) {

      case 'APPLIED':
        return 'status-applied';

      case 'SHORTLISTED':
        return 'status-review';

      case 'INTERVIEW':
        return 'status-interview';

      case 'SELECTED':
        return 'status-offer';

      case 'REJECTED':
        return 'status-rejected';

      default:
        return '';

    }

  }


  // View application

  viewApplication(application: any): void {

    console.log(
      'Viewing application:',
      application
    );

  }

}