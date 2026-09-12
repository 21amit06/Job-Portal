import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { ApplicationService } from '../../services/application.service';
import { InterviewService } from '../../services/interview.service';

@Component({
    selector: 'app-applicants',

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

    templateUrl: './applicants.component.html',
    styleUrl: './applicants.component.css'
})
export class RecuriterApplicantsComponent implements OnInit {

    searchText = '';
    selectedJob = 'All';
    selectedStatus = 'All';
    applicants: any[] = [];

    constructor(
        private applicationService: ApplicationService,
         private interviewService: InterviewService
    ) {}


    ngOnInit(): void {
        this.loadApplicants();

    }


    loadApplicants(): void {this.applicationService.getRecruiterApplications().subscribe({
                next: (response: any) => {
                    this.applicants =response.applications || [];

                },

                error: (error) => {
                   console.error(
                        'Failed to load applicants:',
                        error
                    );

                }

            });
    }


    get filteredApplicants() {

        return this.applicants.filter(
            applicant => {
               const search =this.searchText.toLowerCase().trim();

                const applicantName =(applicant.applicant_name || '').toLowerCase();

                const applicantEmail =(applicant.applicant_email || '').toLowerCase();

                const jobTitle =(applicant.job_title || '').toLowerCase();

                const matchesSearch =applicantName.includes(search) ||applicantEmail.includes(search);

                const matchesJob =this.selectedJob === 'All' ||applicant.job_title === this.selectedJob;

                const matchesStatus =this.selectedStatus === 'All' ||applicant.status ===this.selectedStatus.toUpperCase();
                return (
                    matchesSearch &&
                    matchesJob &&
                    matchesStatus
                );

            }
        );

    }


    get jobTitles(): string[] {
        return [
            ...new Set(
                this.applicants
                    .map(applicant => applicant.job_title)
                    .filter(title => title)
            )
        ];

    }


    getStatusText(status: string): string {

        switch (status) {

            case 'APPLIED':
                return 'Applied';

            case 'SHORTLISTED':
                return 'Shortlisted';

            case 'INTERVIEW':
                return 'Interview';

            case 'SELECTED':
                return 'Selected';

            case 'REJECTED':
                return 'Rejected';

            default:
                return status;

        }

    }


    getInitials(name: string): string {

        if (!name) {
            return '';
        }

        const parts = name.trim().split(' ');

        if (parts.length === 1) {
           return parts[0].substring(0, 2).toUpperCase();

        }

        return (
            parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();

    }


    getAppliedDate(date: string): string {

        if (!date) {
            return '';
        }

        return new Date(date).toLocaleDateString('en-US',{
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                }
            );

    }


    shortlist(applicant: any): void {
        this.updateStatus(applicant,'SHORTLISTED');
    }


  scheduleInterview(applicant: any): void {

    const scheduledDate = prompt(
        'Enter interview date (YYYY-MM-DD):'
    );

    if (!scheduledDate) {
        return;
    }


    const scheduledTime = prompt(
        'Enter interview time (HH:MM):'
    );

    if (!scheduledTime) {
        return;
    }


    const modeInput = prompt(
        'Enter interview mode: ONLINE or OFFLINE'
    );

    if (!modeInput) {
        return;
    }


    const mode = modeInput.toUpperCase();


    if (
        mode !== 'ONLINE' &&
        mode !== 'OFFLINE'
    ) {

        alert(
            'Mode must be ONLINE or OFFLINE.'
        );

        return;

    }


    let meetingLink = '';
    let location = '';


    if (mode === 'ONLINE') {

        meetingLink = prompt(
            'Enter meeting link:'
        ) || '';

    }


    if (mode === 'OFFLINE') {

        location = prompt(
            'Enter interview location:'
        ) || '';

    }


    const interviewerName = prompt(
        'Enter interviewer name:'
    ) || '';


    const notes = prompt(
        'Enter interview notes:'
    ) || '';


    const interview = {

        application_id:
            applicant.application_id,

        scheduled_date:
            scheduledDate,

        scheduled_time:
            scheduledTime,

        mode:
            mode,

        meeting_link:
            meetingLink,

        location:
            location,

        interviewer_name:
            interviewerName,

        notes:
            notes

    };


    console.log(
        'Creating interview:',
        interview
    );


    this.interviewService.createInterview(interview).subscribe({
            next: (response: any) => {

                console.log(
                    'Interview created:',
                    response
                );


                // Update application status
                applicant.status =
                    'INTERVIEW';


                alert(
                    'Interview scheduled successfully.'
                );

            },


            error: (error) => {

                console.error(
                    'Failed to schedule interview:',
                    error
                );


                alert(
                    error.error?.message ||
                    'Failed to schedule interview.'
                );

            }

        });

}


    selectApplicant(applicant: any): void {

        this.updateStatus(
            applicant,
            'SELECTED'
        );

    }


    rejectApplicant(applicant: any): void {

        this.updateStatus(
            applicant,
            'REJECTED'
        );

    }


    updateStatus( applicant: any,status: string): void {

        this.applicationService.updateApplicationStatus(applicant.application_id,status).subscribe({
                next: (response: any) => {

                    console.log(
                        'Application status updated:',
                        response
                    );

                    applicant.status = status;

                },

                error: (error) => {

                    console.error(
                        'Failed to update application:',
                        error
                    );

                }

            });

    }


    viewApplicant(applicant: any): void {

        console.log('View applicant:',applicant);

    }


    downloadResume(applicant: any): void {

        if (!applicant.resume_url) {

            alert(
                'Resume is not available.'
            );

            return;

        }

        window.open(
            applicant.resume_url,
            '_blank'
        );

    }

}