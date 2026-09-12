import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
 notifications = [
    {
      id: 1,
      title: 'Interview Scheduled',
      message: 'Your interview for UI/UX Designer at Creative Minds has been scheduled.',
      time: '10 minutes ago',
      icon: 'event',
      type: 'interview',
      unread: true
    },
    {
      id: 2,
      title: 'Application Under Review',
      message: 'Your application for Frontend Developer at Tech Solutions Inc. is under review.',
      time: '2 hours ago',
      icon: 'work',
      type: 'application',
      unread: true
    },
    {
      id: 3,
      title: 'New Job Recommendation',
      message: 'A new Backend Developer position matches your profile.',
      time: '5 hours ago',
      icon: 'recommend',
      type: 'job',
      unread: true
    },
    {
      id: 4,
      title: 'Application Submitted',
      message: 'Your application for DevOps Engineer at Infinity Labs was successfully submitted.',
      time: 'Yesterday',
      icon: 'check_circle',
      type: 'success',
      unread: false
    },
    {
      id: 5,
      title: 'Profile Reminder',
      message: 'Complete your profile to improve your chances of getting hired.',
      time: '2 days ago',
      icon: 'person',
      type: 'profile',
      unread: false
    }
  ];

  get unreadCount() {
    return this.notifications.filter(
      notification => notification.unread
    ).length;
  }

  markAsRead(notification: any) {
    notification.unread = false;
  }

  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.unread = false;
    });
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(
      notification => notification.id !== id
    );
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'interview':
        return 'icon-interview';

      case 'application':
        return 'icon-application';

      case 'job':
        return 'icon-job';

      case 'success':
        return 'icon-success';

      case 'profile':
        return 'icon-profile';

      default:
        return '';
    }
  }
}
