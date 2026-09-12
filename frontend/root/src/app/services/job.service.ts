import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:3000/api/jobs';

  constructor(private http: HttpClient) {}

  // Create a new job
  createJob(job: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      job
    );
  }

  // Get all jobs
  getAllJobs(): Observable<any> {
    return this.http.get(
      this.apiUrl
    );
  }

  // Get jobs posted by logged-in recruiter
  getMyJobs(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/my-jobs`
    );
  }

  // Get job by ID
  getJobById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`
    );
  }

  // Update job
  updateJob(id: number, job: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      job
    );
  }

  // Delete job
  deleteJob(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
