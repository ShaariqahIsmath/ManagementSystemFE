import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentApiService } from '../../services/student/student.service';
import { Course, Department } from '../../management.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {
  studentId: number = 0;

  registrationForm!: FormGroup;
  courses: Course[] = [];
  departments: Department[] = [];
  registrationSources = ['Website', 'Event', 'Manual Entry', 'Email Campaign'];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  isSuccess: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private studentApiService: StudentApiService, private router: Router) { }

  ngOnInit(): void {
    // Fetch the studentId from the route parameters
    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      console.log(this.studentId)
      // You can use this.studentId here if needed
    });

    // Initialize the registrationForm
    this.registrationForm = this.fb.group({
      registrationDate: ['', Validators.required],
      registrationMethod: ['', Validators.required],
      registrationSource: ['', Validators.required],
      course: ['', Validators.required],
      department: ['', Validators.required]
    });

    // Fetch courses and departments
    this.fetchCourses();
    this.fetchDepartments();
  }

  fetchCourses(): void {
    this.studentApiService.getAllCourses().subscribe(
      (data: any[]) => {
        this.courses = data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  
  fetchDepartments(): void {
    this.studentApiService.getAllDepartments().subscribe(
      (data: any[]) => {
        this.departments = data;
      },
      error => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  
  onSubmit(): void {
    if (!this.registrationForm.valid) {
      console.log('Form is invalid');
      return;
    }
  
    const registrationDto = {
      registrationDate: this.registrationForm.value.registrationDate,
      registrationMethod: this.registrationForm.value.registrationMethod,
      registrationSource: this.registrationForm.value.registrationSource,
      course: { id: this.registrationForm.value.course },
      department: { id: this.registrationForm.value.department }
    };
  
    this.studentApiService.registerStudent(this.studentId ?? 0, registrationDto)
      .subscribe(
        response => {
          console.log('API Response:', response);
          this.handleResponse(response);
        },
        error => {
          console.error('Registration failed:', error);
          this.handleError(error);
        }
      );
  }
  
  private handleResponse(response: any): void {
    try {
      if (response.message === "Registration complete successfully!") {
        console.log('Registration successful!');
        this.handleSuccess();
      } else {
        console.log('Registration failed due to unknown error.');
        this.handleError("An unknown error occurred.");
      }
    } catch (error) {
      console.error('Error parsing response:', error);
      this.handleError("An error occurred while processing the response.");
    }
  }
  
  private handleError(error: any): void {
    try {
      if (error.status === 200 && error.error.message === "Registration complete successfully!") {
        console.log('Registration successful!');
        this.handleSuccess();
      } else {
        console.log('Registration failed due to server error.');
        this.errorMessage = "An error occurred while registering the student.";
      }
    } catch (parseError) {
      console.error('Error parsing error:', parseError);
      this.errorMessage = "An error occurred while processing the error.";
    }
  }
  
  private handleSuccess(): void {
    this.isSuccess = true;
    this.successMessage = "Registration added successfully!";
    this.errorMessage = '';
  
    // Redirect to student-data-table component after 1 second
    setTimeout(() => {
      this.router.navigate(['/students-data-table']);
    }, 1000);
  }
  
  transformEnumToString(value: string): string {
    if (!value) return '';
  
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
