import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

   private apiUrl = 'http://localhost:3000/api/applications';

  constructor(private http: HttpClient) {}

  // Apply for a job
  applyForJob(application: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      application
    );
  }

  // Get applications of logged-in job seeker
  getMyApplications(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/my-applications`
    );
  }

  // Get all applications for a particular job
  // Used by recruiter
  getJobApplications(jobId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/job/${jobId}`
    );
  }

  // Get application by ID
  getApplicationById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`
    );
  }

  // Recruiter updates application status
  updateApplicationStatus(
    id: number,
    status: string
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}/status`,
      {
        status: status
      }
    );
  }


  getRecruiterApplications() {
    return this.http.get(`${this.apiUrl}/recruiter`);
}
}
