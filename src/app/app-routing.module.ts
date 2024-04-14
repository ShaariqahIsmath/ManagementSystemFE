import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsDataTableComponent } from './components/students-data-table/students-data-table.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { EditStudentProfileComponent } from './components/edit-student-profile/edit-student-profile.component';
import { EditStudentRegistrationComponent } from './components/edit-student-registration/edit-student-registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/app-landing', pathMatch: 'full' },
  { path: 'app-landing', component: LandingComponent },
  { path: 'app-header', component: HeaderComponent },
  { path: 'sign-up', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'student-profile', component: StudentProfileComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'register-student/:id', component: RegisterStudentComponent},
  { path: 'student/:id', component: StudentDetailsComponent },
  { path: 'students-data-table', component: StudentsDataTableComponent },
  { path: 'edit-student-profile/:id', component: EditStudentProfileComponent },
  { path: 'edit-student-registration/:id', component: EditStudentRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
