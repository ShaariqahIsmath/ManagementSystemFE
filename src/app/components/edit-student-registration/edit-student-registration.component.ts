import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { StudentApiService } from '../../services/student/student.service'; 
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Course } from '../../management.model';


@Component({
  selector: 'app-edit-student-registration',
  templateUrl: './edit-student-registration.component.html',
  styleUrls: ['./edit-student-registration.component.scss']
})
export class EditStudentRegistrationComponent implements OnInit {

  @Input() studentId?: number | null;

  registrationForm!: FormGroup;

  registration: any = {
    registrationDate: '',
    registrationMethod: '',
    registrationSource: '',
    course: {
      name: '',
      type: ''
    }
  };

  courses: Course[] = [];
  registrationSources = ['Website', 'Event', 'Manual Entry', 'Email Campaign'];
  registrationMethods = ['On-line', 'In-person'];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  isSuccess: boolean = false;

  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'YYYY-MM-DD',
    // ... other configurations can be added here
  };

  datepickerConfig: Partial<BsDatepickerConfig>;


  constructor(
    public bsModalRef: BsModalRef,
    private apiService: StudentApiService,
    private fb: FormBuilder,
  ) {
    this.datepickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue', dateInputFormat: 'YYYY-MM-DD' });

   }

ngOnInit(): void {
  this.fetchCourses();

  this.registrationForm = this.fb.group({
    registrationId: [{ value: '', disabled: true }],
    registrationDate: ['', Validators.required],
    registrationMethod: ['', Validators.required],
    registrationSource: ['', Validators.required],
    courseId: ['', Validators.required],
    courseName: ['', Validators.required],
    courseType: [{ value: '', disabled: true }]
  });

  if (this.studentId) {
    this.apiService.getStudentById(this.studentId).subscribe(
      (student) => {
        console.log("Fetched Student:", student); // Log the fetched student object

        this.registration = {
          id: student.registration.id,
          registrationDate: student.registration.registrationDate, // Extract the date part
          registrationMethod: student.registration.registrationMethod,
          registrationSource: student.registration.registrationSource,
          course: {
            id: student.course.id,
            name: student.course.name,
            type: student.course.type
          }
        };

        console.log('Fetched Registration:', this.registration); // Log the registration object


        // Format the date to "YYYY-MM-DD"
        this.registrationForm.patchValue({
          registrationId: this.registration.id,
          registrationDate: this.registration.registrationDate, // Set the formatted date here
          registrationMethod: this.registration.registrationMethod,
          registrationSource: this.registration.registrationSource,
          courseId: this.registration.course.id,
          courseName: this.registration.course.id, // Setting the initial value for courseName
          courseType: this.registration.course.type
        });
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }
}

fetchCourses(): void {
  this.apiService.getAllCourses().subscribe(
    (data: any[]) => {
      this.courses = data;
      
      // Set initial value for courseName control
      const initialCourse = this.courses.find(course => course.id === this.registration.courseId);
      if (initialCourse) {
        this.registrationForm.get('courseName')?.setValue(initialCourse.id);
      }
    },
    error => {
      console.error('Error fetching courses:', error);
    }
  );
}



saveRegistration(): void {
  if (this.registration.id) {
    const updatedValues = this.registrationForm.value;

    // Create a new object to store only the changed fields
    const updatedFields: any = {};

    // Compare each field with the initial registration object
    if (updatedValues.registrationDate !== this.registration.registrationDate) {
      updatedFields.registrationDate = updatedValues.registrationDate;
    }

    if (updatedValues.registrationMethod !== this.registration.registrationMethod) {
      updatedFields.registrationMethod = updatedValues.registrationMethod;
    }

    if (updatedValues.registrationSource !== this.registration.registrationSource) {
      updatedFields.registrationSource = updatedValues.registrationSource;
    }

    if (updatedValues.courseId !== this.registration.course.id) {
      updatedFields.course = {
        id: updatedValues.courseId
      };
    }

    // Call the API with the updatedFields object
    this.apiService.updateRegistrationDetails(this.registration.id, updatedFields)
      .subscribe(
        response => {
          console.log('Full response:', response);
          console.log('Type of response:', typeof response);

          if (response === "Registration details updated successfully!") {  // Updated condition here
            this.handleSuccess();
          } else {
            this.handleError();
          }
        },
        error => {
          console.error('Error updating registration details', error);
          this.handleError();
        }
      );
  }
}




private handleResponse(response: any): void {
  try {
    if (response && response.trim() === "Student Registration details updated successfully!") {
      console.log('Student Registration Update successful!');
      this.handleSuccess();
    } else {
      console.log('Student Registration Update failed due to unknown error.');
      this.handleError();
    }
  } catch (error) {
    console.error('Error handling response:', error);
    this.handleError();
  }
}

private handleSuccess(): void {
  this.isSuccess = true;
  this.successMessage = "Student Registration updated successfully!";
  this.errorMessage = '';


  // Redirect to student details component and refresh after a delay
  setTimeout(() => {
    if (this.bsModalRef) {
      this.bsModalRef.hide();
      this.apiService.triggerStudentUpdate();

    }
  }, 1000);
}

private handleError(): void {
  this.errorMessage = "An error occurred while updating!";
  this.successMessage = null; // Clear success message

}


}
