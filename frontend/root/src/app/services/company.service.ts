import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

private apiUrl = 'http://localhost:3000/api/companies';

  constructor(private http: HttpClient) {}

  // Recruiter creates a company
  createCompany(company: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      company
    );
  }

  // Get logged-in recruiter's company
  getMyCompany(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/my-company`
    );
  }

  // Get company by ID
  getCompanyById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`
    );
  }

  // Update company
updateMyCompany(data: any) {
    return this.http.put(
        `${this.apiUrl}/my-company`,
        data
    );
}
}
