import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { InterviewService } from '../../services/interview.service';


@Component({
  selector: 'app-interviews',

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

  templateUrl: './interviews.component.html',
  styleUrl: './interviews.component.css'
})
export class RecuriterInterviewsComponent implements OnInit {

  searchText = '';

  selectedStatus = 'All';

  interviews: any[] = [];


  constructor(
    private interviewService: InterviewService
  ) {}



  // LOAD INTERVIEWS
  ngOnInit(): void {

    this.loadInterviews();

  }


  loadInterviews(): void {
    this.interviewService.getRecruiterInterviews().subscribe({
      next: (response: any) => {

        this.interviews =response.interviews || [];

      },

      error: (error) => {
        console.error(
          'Failed to load recruiter interviews:',
          error
        );

      }

    });

  }



  // FILTER INTERVIEWS


  get filteredInterviews(): any[] {

    return this.interviews.filter(interview => {

      const search =this.searchText.toLowerCase().trim();

      const candidate =(
          interview.candidate_name ||
          interview.applicant_name ||
          ''
        ).toLowerCase();
    

      const position =(
          interview.title ||
          ''
        ).toLowerCase();


      const matchesSearch =candidate.includes(search) ||
                            position.includes(search);


      let matchesStatus = true;

      if (this.selectedStatus === 'Upcoming') {

        matchesStatus =interview.status === 'SCHEDULED' ||
                       interview.status === 'RESCHEDULED';

      }

      else if (this.selectedStatus === 'Completed') {
        matchesStatus =interview.status === 'COMPLETED';
      }

      else if (this.selectedStatus === 'Cancelled') {
        matchesStatus =interview.status === 'CANCELLED';

      }

      return matchesSearch && matchesStatus;

    });

  }



  // GET INITIALS


  getInitials(name: string): string {

    if (!name) {
      return '';
    }
    const parts =name.trim().split(' ');


    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();

    }


    return ( parts[0].charAt(0) +parts[parts.length - 1].charAt(0)).toUpperCase();

  }



  // STATUS TEXT


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
      return 'In-person';

    }
    return interview.mode || '';

  }



  // VIEW INTERVIEW
  viewInterview(interview: any): void {

    console.log(
      'View interview:',
      interview
    );

  }



  // RESCHEDULE
  rescheduleInterview(interview: any): void {

    console.log(
      'Reschedule interview:',
      interview
    );

  }



  // CANCEL INTERVIEW
  cancelInterview(interview: any): void {

    console.log(
      'Cancel interview:',
      interview
    );

  }



  // JOIN INTERVIEW


  joinInterview(interview: any): void {
    console.log(
      'Join interview:',
      interview
    );

    if (interview.meeting_link) {
      window.open(
        interview.meeting_link,
        '_blank'
      );

    }

    else {

      alert(
        'Meeting link is not available.'
      );

    }

  }

}