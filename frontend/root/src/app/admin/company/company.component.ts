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
import { MatTooltipModule } from '@angular/material/tooltip';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-company',
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
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class AdminCompanyComponent implements OnInit {

  searchText = '';
  selectedStatus = 'All';
  selectedIndustry = 'All';
  companies: any[] = [];


  constructor(
    private adminService: AdminService
  ) {}



  // INITIALIZE


  ngOnInit(): void {

    this.loadCompanies();

  }



  // LOAD COMPANIES

  loadCompanies(): void {

    this.adminService.getCompanies().subscribe({

      next: (response: any) => {
        const companies =response.companies || [];

        this.companies =companies.map((company: any) => {
            return {
              id: company.company_id,
              name:company.company_name,
              recruiter: company.recruiter_name ||'Unknown',
              email:company.recruiter_email || '',
              industry:company.industry ||'Not specified',
              location:company.location ||'Not specified',
              jobs:Number(company.jobs) || 0,
              employees:company.company_size ||'Not specified',
              joined:this.formatDate(company.created_at),
              status:this.getStatusText( company.status)
            };

          });

      },
      error: (error) => {

        console.error(
          'Failed to load companies:',
          error
        );

      }

    });

  }



  // STATUS TEXT


  getStatusText(status: string): string {
    if (!status) {
      return 'Pending';
    }
    return (
      status.charAt(0).toUpperCase() +
      status.slice(1).toLowerCase()
    );

  }



  // DATE FORMAT
  formatDate(date: string): string {
    if (!date) {
      return '';
    }
    return new Date(date).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }
    );

  }



  // FILTER COMPANIES


  get filteredCompanies() {
    return this.companies.filter(company => {
      const search =this.searchText.toLowerCase().trim();
      const searchMatch = company.name.toLowerCase().includes(search)||
                          company.recruiter.toLowerCase().includes(search)||
                          company.location.toLowerCase().includes(search);


      const statusMatch =this.selectedStatus === 'All' ||
            company.status ===this.selectedStatus;

      const industryMatch =this.selectedIndustry === 'All'||
        company.industry ===this.selectedIndustry;

      return ( searchMatch &&statusMatch &&industryMatch );

    });

  }



  // VIEW COMPANY


  viewCompany(company: any): void {
    console.log(
      'View company:',
      company
    );

  }



  // APPROVE COMPANY


  approveCompany(company: any): void {

    this.adminService.updateCompanyStatus( company.id,'ACTIVE').subscribe({
        next: (response: any) => {
          company.status = 'Active';
          alert(
            'Company approved successfully.'
          );

        },


        error: (error) => {
          alert(
            error.error?.message ||
            'Failed to approve company.'
          );

        }

      });

  }



  // TOGGLE COMPANY STATUS
  toggleCompanyStatus(company: any): void {
    let newStatus: string;
    if (company.status === 'Active') {
      newStatus = 'SUSPENDED';
    } else {
      newStatus = 'ACTIVE';
    }


    this.adminService.updateCompanyStatus( company.id, newStatus).subscribe({
        next: (response: any) => {
          company.status =
            this.getStatusText(
              newStatus
            );
          alert(
            'Company status updated successfully.'
          );

        },


        error: (error) => {
          alert(
            error.error?.message ||
            'Failed to update company status.'
          );

        }

      });

  }



  // DELETE COMPANY

  deleteCompany(company: any): void {

    const confirmed =
      confirm(
        `Are you sure you want to delete "${company.name}"?`
      );

    if (!confirmed) {
      return;
    }


    this.adminService.deleteCompany(company.id).subscribe({

        next: (response: any) => {

          this.companies =this.companies.filter(item =>
                item.id !== company.id
            );

          alert(
            'Company deleted successfully.'
          );

        },


        error: (error) => {
          alert(
            error.error?.message ||
            'Failed to delete company.'
          );

        }

      });

  }

}