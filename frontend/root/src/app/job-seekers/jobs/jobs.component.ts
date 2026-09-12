import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Router, RouterLink } from '@angular/router';

import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,

    FlexLayoutModule,
    RouterLink
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobseekersJobsComponent implements OnInit {

  searchText = '';
  selectedLocation = 'all';
  selectedJobType = 'all';
  selectedExperience = 'all';

  //sortBy = 'latest';

  jobs: any[] = [];

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

loadJobs(): void {

  this.jobService.getAllJobs().subscribe({
    next: (response: any) => {
      this.jobs = response.jobs;

    },

    error: (error) => {
      console.error('Failed to load jobs:', error);

    }

  });

}
  get filteredJobs() {

  return this.jobs.filter(job => {

    const search = this.searchText.toLowerCase();

    const matchesSearch =job.title.toLowerCase().includes(search) ||
                         job.company_name.toLowerCase().includes(search);


    const matchesLocation =this.selectedLocation === 'all' ||
                          job.location.includes(this.selectedLocation);


    const matchesJobType =this.selectedJobType === 'all' ||
                          job.job_type === this.selectedJobType;


    const matchesExperience =this.selectedExperience === 'all' ||
                            job.experience_required === this.selectedExperience;


    return ( matchesSearch &&matchesLocation && matchesJobType && matchesExperience );

  });

}


  saveJob(job: any): void {

    job.saved = !job.saved;

  }


  applyJob(job: any): void {

  this.router.navigate(['/jobseekers/apply',job.job_id]);

}
}