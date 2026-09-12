import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { JobseekersDashboardComponent } from './job-seekers/dashboard/dashboard.component';
import { JobseekersProfileComponent } from './job-seekers/profile/profile.component';
import { JobseekersJobsComponent } from './job-seekers/jobs/jobs.component';
import { JobseekersInterviewsComponent } from './job-seekers/interviews/interviews.component';
import { JobseekersApplicationsComponent } from './job-seekers/applications/applications.component';
import { RecuriterDashboardComponent } from './recuriter/dashboard/dashboard.component';
import { RecuriterProfileComponent } from './recuriter/profile/profile.component';
import { RecuriterJobsComponent } from './recuriter/jobs/jobs.component';
import { RecuriterInterviewsComponent } from './recuriter/interviews/interviews.component';
import { RecuriterApplicantsComponent } from './recuriter/applicants/applicants.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { AdminJobsComponent } from './admin/jobs/jobs.component';
import { AdminCompanyComponent } from './admin/company/company.component';
import { NotificationsComponent } from './job-seekers/notifications/notifications.component';
import { MainLayoutComponent } from './MainLayout/main-layout/main-layout.component';
import { PostJobComponent } from './recuriter/post-job/post-job.component';
//import { ApplyComponent } from './job-seekers/apply/apply.component';
import { JobseekersApplyComponent } from './job-seekers/jobseekers-apply/jobseekers-apply.component';
import { JobDetailsComponent } from './job-seekers/job-details/job-details.component';
import { ResumeAiComponent } from './job-seekers/resume-ai/resume-ai.component';


export const routes: Routes = [
    {path:"",component:LoginComponent}, 

    {path:'register',component:RegisterComponent},


     {
    path: '',
    component: MainLayoutComponent,
    children: [

    
    {path:'jobseekers/dashboard',component:JobseekersDashboardComponent},
    {
  path: 'jobseekers/job-details/:id',
  component: JobDetailsComponent
},
{
  path: 'jobseekers/interviews',
  component: JobseekersInterviewsComponent
},  {path:'jobseekers/profile',component:JobseekersProfileComponent},
     {path:'jobseekers/jobs',component:JobseekersJobsComponent},
     {path:'jobseekers/interviews',component:JobseekersInterviewsComponent},
     {path:'jobseekers/applications',component:JobseekersApplicationsComponent},
     {path: 'jobseekers/notifications',component: NotificationsComponent},
     {
  path: 'jobseekers/ai-jobs',
  component: ResumeAiComponent
}
    ,






       {path:'recuriter/dashboard',component:RecuriterDashboardComponent},
     {path:'recuriter/profile',component:RecuriterProfileComponent},
     {path:'recuriter/jobs',component:RecuriterJobsComponent},
     {path:'recuriter/interviews',component:RecuriterInterviewsComponent},
     {path:'recuriter/applicant',component:RecuriterApplicantsComponent},
     {
  path: 'recuriter/post-job',
  component: PostJobComponent
},
{
  path: 'jobseekers/apply/:jobId',
  component: JobseekersApplyComponent
},
    


      {path:'admin/dashboard',component:AdminDashboardComponent},
    {path:'admin/users',component:AdminUsersComponent},
    {path:'admin/jobs',component:AdminJobsComponent},
    {path:'admin/company',component:AdminCompanyComponent},
     
]}];



    // {path:'jobseekers/dashboard',component:JobseekersDashboardComponent},
    // {path:'jobseekers/profile',component:JobseekersProfileComponent},
    // {path:'jobseekers/jobs',component:JobseekersJobsComponent},
    // {path:'jobseekers/interviews',component:JobseekersInterviewsComponent},
    // {path:'jobseekers/applications',component:JobseekersApplicationsComponent},



    //  {path:'recuriter/dashboard',component:RecuriterDashboardComponent},
    // {path:'recuriter/profile',component:RecuriterProfileComponent},
    // {path:'recuriter/jobs',component:RecuriterJobsComponent},
    // {path:'recuriter/interviews',component:RecuriterInterviewsComponent},
    // {path:'recuriter/applicant',component:RecuriterApplicantsComponent},


    