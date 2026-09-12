import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class RecuriterJobsComponent implements OnInit {

  searchText = '';
  selectedStatus = 'All';

  jobs: any[] = [];

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  // Get jobs posted by logged-in recruiter
loadJobs(): void {
  this.jobService.getMyJobs().subscribe({
    next: (response: any) => {
      // console.log('FULL RESPONSE:', response);
      // console.log('RESPONSE TYPE:', typeof response);
      // console.log('IS ARRAY:', Array.isArray(response));
      // console.log('RESPONSE.JOBS:', response?.jobs);

      this.jobs = response?.jobs || [];

      // console.log('THIS.JOBS:', this.jobs);
    },

    error: (error) => {
      console.error('FAILED TO LOAD RECRUITER JOBS:', error);
      // console.error('STATUS:', error.status);
      // console.error('ERROR BODY:', error.error);
    }
  });
}
  get filteredJobs() {

    return this.jobs.filter(job => {

      const search = this.searchText.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        (job.location || '').toLowerCase().includes(search) ||
        (job.company_name || '').toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        job.status === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  postJob(): void {

    this.router.navigate(['/recuriter/post-job']);

  }

  editJob(job: any): void {

    console.log('Edit job:', job);

  }

  viewApplicants(job: any): void {

    console.log('View applicants:', job);

  }

  toggleJobStatus(job: any): void {

    const newStatus =
      job.status === 'ACTIVE'
        ? 'CLOSED'
        : 'ACTIVE';

    this.jobService.updateJob(job.job_id, {

      title: job.title,
      description: job.description,
      requirements: job.requirements,
      location: job.location,
      job_type: job.job_type,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      experience_required: job.experience_required,
      skills: job.skills,
      vacancies: job.vacancies,
      status: newStatus

    }).subscribe({

      next: (response: any) => {

        console.log('Job status updated:', response);

        job.status = newStatus;

      },

      error: (error) => {

        console.error('Failed to update job status:', error);

      }

    });

  }

  deleteJob(job: any): void {

    this.jobService.deleteJob(job.job_id).subscribe({

      next: () => {

        console.log('Job deleted successfully');

        this.jobs = this.jobs.filter(
          item => item.job_id !== job.job_id
        );

      },

      error: (error) => {

        console.error('Failed to delete job:', error);

      }

    });

  }

}