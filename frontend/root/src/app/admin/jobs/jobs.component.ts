import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
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
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class AdminJobsComponent implements OnInit {

  searchText = '';
  selectedStatus = 'All';
  selectedType = 'All';
  jobs: any[] = [];

  constructor(
    private adminService: AdminService
  ) {}

  // INITIALIZE
  
  ngOnInit(): void {

    this.loadJobs();

  }
  
  // LOAD JOBS
  

  loadJobs(): void {

    this.adminService.getJobs().subscribe({
      next: (response: any) => {

 const jobs =response.jobs || [];
        this.jobs = jobs.map((job: any) => {
       return {
              id: job.job_id,
              title: job.title,
              company:job.company_name ||'No company',
              recruiter:job.recruiter_name ||'Unknown',
              location:job.location ||'Not specified',
              type:this.getJobTypeText(job.job_type),
              applicants:Number(job.applicants) || 0,
              posted:this.formatDate(job.created_at),
              status:this.getStatusText(job.status)

            };

          }
        );


        // console.log(
        //   'Jobs array:',
        //   this.jobs
        // );

      },


      error: (error) => {
        console.error('Failed to load jobs:',error);

      }

    });

  }


  
  // JOB TYPE
  

  getJobTypeText(jobType: string): string {

    switch (jobType) {
      case 'FULL_TIME':
        return 'Full Time';

      case 'PART_TIME':
        return 'Part Time';

      case 'CONTRACT':
        return 'Contract';

      case 'INTERNSHIP':
        return 'Internship';

      default:
        return jobType;

    }

  }


  
  // STATUS
  

  getStatusText(status: string): string {

    if (!status) {
      return 'Active';
    }

    return (status.charAt(0).toUpperCase() +status.slice(1).toLowerCase());

  }


  
  // DATE
  formatDate(date: string): string {

    if (!date) {
      return '';
    }

    return new Date(date).toLocaleDateString('en-US',
      {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }
    );

  }


  
  // FILTERED JOBS
  

  get filteredJobs() {

    return this.jobs.filter(job => {
      const search =this.searchText.toLowerCase().trim();
      const matchesSearch =job.title.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search)||
        job.location.toLowerCase().includes(search);

      const matchesStatus =this.selectedStatus === 'All'||job.status === this.selectedStatus;
      const matchesType =this.selectedType === 'All'||job.type === this.selectedType;
      return (matchesSearch &&matchesStatus &&matchesType);

    });

  }


  
  // VIEW JOB
  viewJob(job: any): void {
   console.log('View job:',job);

  }


  
  // TOGGLE STATUS
  

  toggleStatus(job: any): void {

    let newStatus: string;

    if (job.status === 'Active') {
      newStatus = 'CLOSED';
    } else {
      newStatus = 'ACTIVE';
    }


    this.adminService.updateJobStatus(job.id,newStatus ).subscribe({
        next: (response: any) => {

          job.status =this.getStatusText( newStatus );

          alert(
            'Job status updated successfully.'
          );

        },


        error: (error) => {
          alert(
            error.error?.message ||
            'Failed to update job status.'
          );

        }

      });

  }


  
  // APPROVE JOB
  

  // approveJob(
  //   job: any
  // ): void {

  //   this.adminService
  //     .updateJobStatus(
  //       job.id,
  //       'ACTIVE'
  //     )
  //     .subscribe({

  //       next: (response: any) => {

  //         console.log(
  //           'Job approved:',
  //           response
  //         );


  //         job.status = 'Active';


  //         alert(
  //           'Job approved successfully.'
  //         );

  //       },


  //       error: (error) => {

  //         console.error(
  //           'Failed to approve job:',
  //           error
  //         );


  //         alert(
  //           error.error?.message ||
  //           'Failed to approve job.'
  //         );

  //       }

  //     });

  // }


  
  // DELETE JOB
  

  deleteJob(job: any): void {
  const confirmed =confirm(`Are you sure you want to delete "${job.title}"?`);

  if (!confirmed) {
    return;
  }


  this.adminService.deleteJob(job.id).subscribe({
  next: (response: any) => {

        this.jobs =this.jobs.filter(item =>item.id !== job.id);
        alert(
          'Job deleted successfully.'
        );

      },


      error: (error) => {

        alert( error.error?.message ||'Failed to delete job.');

      }

    });

}

}