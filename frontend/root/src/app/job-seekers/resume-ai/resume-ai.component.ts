import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-resume-ai',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule
  ],
  templateUrl: './resume-ai.component.html',
  styleUrl: './resume-ai.component.css'
})
export class ResumeAiComponent {

  selectedFile: File | null = null;
  loading = false;
  recommendedJobs: any[] = [];
  resumeAnalysis: any = null;

  constructor(
    private aiService: AiService,
    private router: Router
  ) {}


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF resume.');

        return;
      }

      this.selectedFile = file;

      // Clear previous results
      this.recommendedJobs = [];
      this.resumeAnalysis = null;

    }
  }


  removeFile(): void {
    this.selectedFile = null;
    this.recommendedJobs = [];
    this.resumeAnalysis = null;
  }


  findJobs(): void {
    if (!this.selectedFile) {

      alert('Please upload your resume first.');

      return;
    }

    this.loading = true;

    this.aiService.uploadResume(this.selectedFile).subscribe({
      next: (response: any) => {

        this.resumeAnalysis = response.resume_analysis;
        this.recommendedJobs = response.jobs || [];

        this.loading = false;

      },

      error: (error) => {

        this.loading = false;

        alert(
          error.error?.message ||
          'Failed to find matching jobs.'
        );

      }

    });

  }


  viewJob(jobId: number): void {

    this.router.navigate([ '/jobseekers/job-details',jobId]);

  }

}