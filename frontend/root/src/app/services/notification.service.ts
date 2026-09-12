import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient) {}

  // Get all notifications of logged-in user
  getNotifications(): Observable<any> {
    return this.http.get(
      this.apiUrl
    );
  }

  // Get unread notifications
  getUnreadNotifications(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/unread`
    );
  }

  // Get unread notification count
  getUnreadCount(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/unread/count`
    );
  }

  // Mark all notifications as read
  markAllAsRead(): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/read-all`,
      {}
    );
  }

  // Mark one notification as read
  markAsRead(id: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${id}/read`,
      {}
    );
  }
}
