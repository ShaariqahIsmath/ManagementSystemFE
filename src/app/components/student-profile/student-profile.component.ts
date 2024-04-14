import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentApiService } from '../../services/student/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  studentForm: FormGroup;
  responseMessage: string = '';

  constructor(private fb: FormBuilder, private studentApiService: StudentApiService, private router: Router) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  goToHomePage(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);  // Navigate to the LandingComponent after 3 seconds
    }, 1000);  // Delay for 1 second
  }



  transformDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

onSubmit(): void {
  if (this.studentForm.valid) {
    let studentData = this.studentForm.value;
    studentData.dateOfBirth = this.transformDate(new Date(studentData.dateOfBirth));

    this.studentApiService.createStudent(studentData)
    .subscribe({
      next: (response) => {
        console.log('Response:', response);
        if (typeof response === 'string') {
          this.responseMessage = response; // handle the string message directly
        } else {
          this.responseMessage = 'Student successfully added!';
        }
        this.goToHomePage();
        this.studentForm.reset();

      },
      error: (err) => {
        console.log('Error:', err);
        if (err.error && err.error.message) {
          this.responseMessage = err.error.message;
        } else {
          this.responseMessage = 'Failed to create student profile!';
        }
      }
    });
  }
}

}
