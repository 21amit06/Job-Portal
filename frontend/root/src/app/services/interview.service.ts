import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

   private apiUrl = 'http://localhost:3000/api/interviews';

  constructor(private http: HttpClient) {}

  // Recruiter schedules interview
  createInterview(interview: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      interview
    );
  }

  // Job seeker's interviews
  getMyInterviews(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/my-interviews`
    );
  }

  // Recruiter's interviews
  getRecruiterInterviews(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/recruiter`
    );
  }

  // Interview details
  getInterviewById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`
    );
  }

  // Recruiter updates interview
  updateInterview(id: number, interview: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      interview
    );
  }

  // Recruiter updates interview status
  updateInterviewStatus(
    id: number,
    status: string
  ): Observable<any> {

    return this.http.patch(
      `${this.apiUrl}/${id}/status`,
      {
        status: status
      }
    );
  }
}
