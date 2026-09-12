import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { InterviewService } from '../../services/interview.service';

@Component({
  selector: 'app-interviews',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './interviews.component.html',
  styleUrl: './interviews.component.css'
})
export class JobseekersInterviewsComponent implements OnInit {

  interviews: any[] = [];

  constructor(
    private interviewService: InterviewService
  ) {}

  ngOnInit(): void {
    this.loadInterviews();
  }

  loadInterviews(): void {

    this.interviewService.getMyInterviews().subscribe({
      next: (response: any) => {
        this.interviews = response.interviews || [];
      
      },

      error: (error) => {
        console.error(
          'Failed to load interviews:',
          error
        );

      }

    });

  }


 
  // UPCOMING INTERVIEWS
 

  get upcomingInterviews(): any[] {

    return this.interviews.filter(
      interview =>interview.status === 'SCHEDULED' ||
                  interview.status === 'RESCHEDULED'
    );

  }


 
  // STATUS CLASS
 

  getStatusClass(status: string): string {

    switch (status) {

      case 'SCHEDULED':
        return 'status-upcoming';

      case 'RESCHEDULED':
        return 'status-upcoming';

      case 'COMPLETED':
        return 'status-completed';

      case 'CANCELLED':
        return 'status-cancelled';

      default:
        return '';

    }

  }


 
  // DISPLAY STATUS
 

  getStatusText(status: string): string {

    switch (status) {

      case 'SCHEDULED':
        return 'Upcoming';

      case 'RESCHEDULED':
        return 'Rescheduled';

      case 'COMPLETED':
        return 'Completed';

      case 'CANCELLED':
        return 'Cancelled';

      default:
        return status;

    }

  }


 
  // INTERVIEW TYPE
 

  getInterviewType(interview: any): string {

    if (interview.mode === 'ONLINE') {
      return 'Video Interview';
    }

    if (interview.mode === 'OFFLINE') {
      return 'Offline Interview';
    }

    return interview.mode || '';

  }


 
  // JOIN INTERVIEW
 

  joinInterview(interview: any): void {

    console.log(
      'Joining interview:',
      interview
    );

    if (interview.meeting_link) {

      window.open(
        interview.meeting_link,
        '_blank'
      );

    } else {

      alert('Meeting link is not available.');

    }

  }


 
  // VIEW DETAILS
 

  viewDetails(interview: any): void {

    console.log(
      'Viewing interview:',
      interview
    );

  }

}