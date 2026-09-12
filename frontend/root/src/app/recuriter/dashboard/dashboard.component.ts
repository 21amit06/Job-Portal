import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import {
    Router,
    RouterLink
} from '@angular/router';

import {
    DashboardService
} from '../../services/dashboard.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-dashboard',
  imports: [ RouterLink, CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class RecuriterDashboardComponent implements OnInit {
   
   
    // STATS

    stats = [

        {
            title: 'Jobs Posted',
            value: 0,
            icon: 'work',
            type: 'jobs'
        },

        {
            title: 'Total Applicants',
            value: 0,
            icon: 'people',
            type: 'applicants'
        },

        {
            title: 'Interviews',
            value: 0,
            icon: 'event',
            type: 'interviews'
        },

        {
            title: 'Shortlisted',
            value: 0,
            icon: 'how_to_reg',
            type: 'shortlisted'
        }

    ];


   
    // RECENT JOBS
    recentJobs: any[] = [];

    // RECENT APPLICANTS
    recentApplicants: any[] = [];

 
    constructor(
        private dashboardService: DashboardService,
        private router: Router,
        private companyService:CompanyService
    ) {}


   
    // ON INIT
  
    ngOnInit(): void { 
        this.loadDashboard();
        
    }


   
    // LOAD DASHBOARD

    loadDashboard(): void { this.dashboardService.getRecruiterDashboard().subscribe({
           next: (response: any) => {
               
                    // STATS
                    this.stats[0].value =response.stats.jobsPosted;

                    this.stats[1].value =response.stats.totalApplicants;

                    this.stats[2].value =response.stats.interviews;

                    this.stats[3].value =response.stats.shortlisted;
               
                    // RECENT JOBS             
                    this.recentJobs =response.recentJobs || [];
                    
                               // RECENT APPLICANTS
              
                    this.recentApplicants =response.recentApplicants || [];

                },


                error: (error) => {
                    console.error(
                        'Failed to load recruiter dashboard:',
                        error
                    );

                }

            });

    }


   
    // POST JOB
    createJob(): void {
        this.router.navigate(['/recuriter/post-job']);

    }


   
    // VIEW JOB
    viewJob(job: any): void {
        console.log(
            'View job:',
            job
        );

       

    }


   
    // VIEW APPLICANT
   

    viewApplicant(
        applicant: any
    ): void {

        console.log(
            'View applicant:',
            applicant
        );

        

    }


   
    // STATUS CLASS
   

    getStatusClass(
        status: string
    ): string {

        switch (
            status?.toUpperCase()
        ) {

            case 'ACTIVE':
                return 'status-active';

            case 'CLOSED':
                return 'status-closed';

            case 'NEW':
                return 'status-new';

            case 'SHORTLISTED':
                return 'status-shortlisted';

            case 'INTERVIEW':
                return 'status-interview';

            case 'SELECTED':
                return 'status-selected';

            case 'REJECTED':
                return 'status-rejected';

            case 'APPLIED':
                return 'status-new';

            default:
                return '';

        }

    }


   
    // APPLICANT INITIALS
   

    getInitials(name: string): string {

        if (!name) {
            return '';
        }
        const parts =name.trim().split(' ');

        if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }


        return (parts[0].charAt(0) +parts[parts.length - 1].charAt(0)).toUpperCase();

    }

}
