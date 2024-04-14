import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterPopUpComponent } from './components/register-pop-up/register-pop-up.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { StudentsDataTableComponent } from './components/students-data-table/students-data-table.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentApiService } from './services/student/student.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { EditStudentProfileComponent } from './components/edit-student-profile/edit-student-profile.component';
import { EditStudentRegistrationComponent } from './components/edit-student-registration/edit-student-registration.component';
import { EditStudentAssessmentsComponent } from './components/edit-student-assessments/edit-student-assessments.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    LandingComponent,
    ProfileComponent,
    RegisterPopUpComponent,
    RegisterStudentComponent,
    StudentsDataTableComponent,
    StudentProfileComponent,
    StudentDetailsComponent,
    EditStudentProfileComponent,
    EditStudentRegistrationComponent,
    EditStudentAssessmentsComponent,
    AlertModalComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Required for animations
    ToastrModule.forRoot(), // ToastrModule added here
    BsDatepickerModule.forRoot(), // Add this line
    NgbModalModule,
    NgbModule



  ],
  providers: [
    StudentApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
