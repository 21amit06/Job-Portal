import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
@Component({
  selector: 'app-post-job',
  imports: [ CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent {
job = {
    title: '',
    description: '',
    requirements: '',
    location: '',
    job_type: '',
    salary_min: null,
    salary_max: null,
    experience_required: '',
    skills: '',
    vacancies: 1
  };

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  postJob(): void {

   // console.log('Job data:', this.job);

    this.jobService.createJob(this.job).subscribe({

      next: (response: any) => {

       // console.log('Job posted successfully:', response);

        alert('Job posted successfully');

        this.router.navigate(['/recuriter/jobs']);

      },

      error: (error) => {

    // console.log('Status:', error.status);

    // console.log('Error response:', error.error);

    console.log('Full error:', error);

}

    });
  }

  cancel(): void {
    this.router.navigate(['/recuriter/jobs']);
  }
}
