import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { JobService } from '../../services/job.service';
@Component({
  selector: 'app-job-details',
  imports: [ CommonModule,
    RouterLink,

    MatCardModule,
    MatIconModule,
    MatButtonModule,

    FlexLayoutModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
    job: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {

    const jobId = Number(this.route.snapshot.paramMap.get('id'));

    if (jobId) {
      this.loadJob(jobId);
    }
  }

  loadJob(jobId: number): void {

    this.jobService.getJobById(jobId).subscribe({
      next: (response: any) => {

        // Depending on your backend response
        this.job = response.job || response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load job:', error);

        this.loading = false;
      }

    });
  }

  applyJob(): void {
    console.log('Apply for job:', this.job);

    // Your application logic here
  }

  saveJob(): void {
    console.log('Save job:', this.job);

    // Your save-job logic here
  }
}
