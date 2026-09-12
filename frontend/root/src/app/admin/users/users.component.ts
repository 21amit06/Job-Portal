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
import { MatTooltipModule } from '@angular/material/tooltip';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
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
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class AdminUsersComponent implements OnInit {

  searchText = '';

  selectedRole = 'All';

  selectedStatus = 'All';

  // Users will come from database
  users: any[] = [];

  constructor(
    private adminService: AdminService
  ) {}

  // LOAD USERS

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.adminService.getUsers().subscribe({
      next: (response: any) => {
        const users = response.users || [];
        this.users = users.map((user: any) => {
          return {
            id: user.id,
            first_name: user.first_name || '',
           //last_name: user.last_name || '',
            email: user.email || '',
           // phone: user.phone || '',
            user_type: user.user_type,
            role: this.getRoleText(user.user_type),
            joined: this.formatDate(user.created_at),
            // Database currently has no status column
            status: 'Active'

          };

        });

      },

      error: (error) => {
        console.error(
          'Failed to load users:',
          error
        );

      }

    });

  }


  // GET Full NAME

  getUserName(user: any): string {
   if (!user) {
      return '';
    }
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    return `${firstName} ${lastName}`.trim();

  }


  // GET USER INITIAL
  getInitial(user: any): string {

    if (!user) {
      return '?';
    }
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    if (firstName && lastName) {
      return (
        firstName.charAt(0) +
        lastName.charAt(0)
      ).toUpperCase();

    }

    if (firstName) {
      return firstName
        .charAt(0)
        .toUpperCase();

    }

    if (lastName) {
      return lastName
        .charAt(0)
        .toUpperCase();

    }

    return '?';

  }


  // ROLE TEXT
  getRoleText(userType: string): string {
    switch (userType) {
      case 'JOB_SEEKER':
        return 'Job Seeker';

      case 'RECRUITER':
        return 'Recruiter';

      case 'ADMIN':
        return 'Admin';

      default:
        return userType;

    }

  }


  // DATE FORMAT


  formatDate(date: string): string {
   if (!date) {
      return '';
    }

    return new Date(date).toLocaleDateString('en-US',
      {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }
    );

  }


  // FILTER USERS


  get filteredUsers() {

    return this.users.filter(user => {
      const search =this.searchText.toLowerCase().trim();
      const userName =this.getUserName(user).toLowerCase();
      const email =(user.email || '').toLowerCase();
      const matchesSearch = userName.includes(search)||
        email.includes(search);

      const matchesRole =this.selectedRole === 'All'||
      user.role === this.selectedRole;

      const matchesStatus =this.selectedStatus === 'All' ||
       user.status === this.selectedStatus;

      return (matchesSearch && matchesRole && matchesStatus);

    });

  }


  // VIEW USER


  viewUser(user: any): void {
    console.log('View user:',user);

  }


  // TOGGLE STATUS
  toggleStatus(user: any ): void {

    /*
     * Currently status is not stored
     * in the users table.
     *
     * So this only changes the UI.
     *
     * We can make this persistent later
     * by adding a status column to users.
     */

    if (user.status === 'Active') {
      user.status = 'Inactive';
    } else {
      user.status = 'Active';

    }

  }


  // DELETE USER


  deleteUser(user: any): void {
    const confirmed =confirm( `Are you sure you want to delete ${this.getUserName(user)}?`);

    if (!confirmed) {
      return;
    }

    this.adminService.deleteUser(user.id).subscribe({
    next: (response: any) => {

          // Remove from UI
          this.users =this.users.filter(item =>item.id !== user.id);

          alert('User deleted successfully.');
         },

        error: (error) => {

          //console.error('Failed to delete user:',error);

          alert(error.error?.message ||
            'Failed to delete user.'
          );

        }

      });

  }

}