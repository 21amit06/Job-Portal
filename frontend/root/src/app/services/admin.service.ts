import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}


  // ADMIN DASHBOARD


  getDashboard(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/dashboard`
    );
  }

  

  // USERS


  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/users`
    );
  }

  // Get user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/users/${id}`
    );
  }

  // Delete user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/users/${id}`
    );
  }



  // COMPANIES


  // Get all companies
  getCompanies(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/companies`
    );
  }

  // Update company status
  updateCompanyStatus(
    id: number,
    status: string
  ): Observable<any> {

    return this.http.patch(
      `${this.apiUrl}/companies/${id}/status`,
      {
        status: status
      }
    );
  }



  // JOBS


  // Get all jobs
  getJobs(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/jobs`
    );
  }

  // Update job status
  updateJobStatus(
    id: number,
    status: string
  ): Observable<any> {

    return this.http.patch(
      `${this.apiUrl}/jobs/${id}/status`,
      {
        status: status
      }
    );
  }

  deleteJob(id: number): Observable<any> {

  return this.http.delete(
    `${this.apiUrl}/jobs/${id}`
  );

}


deleteCompany(
  id: number
): Observable<any> {

  return this.http.delete(
    `${this.apiUrl}/companies/${id}`
  );

}

}