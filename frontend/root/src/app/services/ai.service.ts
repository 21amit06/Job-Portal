import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = 'http://localhost:3000/api/ai';

  constructor(private http: HttpClient) {}

  uploadResume(file: File) {

    const formData = new FormData();

    formData.append('resume', file);

    return this.http.post(
      `${this.apiUrl}/recommend-jobs`,
      formData
    );
  }
}
