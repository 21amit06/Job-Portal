import { Component ,OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {JobService} from '../../services/job.service';
import {ApplicationService} from '../../services/application.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobseekers-apply',
  imports: [ CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FlexLayoutModule],
  templateUrl: './jobseekers-apply.component.html',
  styleUrl: './jobseekers-apply.component.css'
})
export class JobseekersApplyComponent {
 job: any = null;

  jobId!: number;

  // APPLICATION
  application = {
    resume_url: '',
    cover_letter: ''
  };

  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private applicationService: ApplicationService

  ) {}



  // INIT


  ngOnInit(): void {
    this.jobId =
      Number(this.route.snapshot.paramMap.get('jobId'));
    this.loadJob();

  }



  // LOAD JOB


  loadJob(): void {
    this.jobService.getJobById(this.jobId).subscribe({
        next: (response: any) => {
          this.job =response.job;

        },

        error: (error) => {
          console.error(
            'Failed to load job:',
            error
          );

        }

      });

  }



  // SUBMIT APPLICATION


  submitApplication(): void {
    if (!this.application.resume_url ||this.application.cover_letter
    ) {

      alert(
        'Please enter resume and cover letter'
      );

      return;

    }


    this.submitting = true;


    const applicationData = { job_id: this.jobId,
      resume_url:this.application.resume_url,
      cover_letter:this.application.cover_letter

    };


    this.applicationService.applyForJob(applicationData).subscribe({
        next: (response: any) => {
          alert(
            'Application submitted successfully'
          );

          this.submitting = false;
          this.router.navigate(['/jobseekers/applications']);

        },


        error: (error) => {
          console.error(
            'Failed to submit application:',
            error
          );

          this.submitting = false;

          alert(
            error.error?.message ||
            'Failed to submit application'
          );

        }

      });

  }



  // CANCEL
  cancel(): void {
    this.router.navigate(['/jobseekers/jobs']);

  }
}
