import { Component, Input, OnInit } from '@angular/core';
import { StudentApiService } from '../../services/student/student.service';
import { AssessmentDetail } from '../../management.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit-student-assessments',
  templateUrl: './edit-student-assessments.component.html',
  styleUrls: ['./edit-student-assessments.component.scss']
})
export class EditStudentAssessmentsComponent implements OnInit {

  @Input() studentId!: number
  @Input() assessmentId!: number

  assessmentDetails!: AssessmentDetail; // Only one declaration here

  assessmentForm!: FormGroup;
  marksValue: number = 0;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  isSuccess: boolean = false;
  constructor(private apiService: StudentApiService, public bsModalRef: BsModalRef, private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Fetch assessment details here
    this.fetchAssessmentDetails(this.studentId, this.assessmentId);  // Replace with actual studentId and assessmentId

    this.assessmentForm = this.fb.group({
      marks: [this.marksValue]  // Initialize with marksValue
    });


    // Subscribe to value changes
    this.assessmentForm.get('marks')?.valueChanges.subscribe(value => {
      this.marksValue = value;
    });
  }

  


  fetchAssessmentDetails(studentId: number, assessmentId: number): void {
    this.apiService.getAssessmentDetails(studentId, assessmentId).subscribe(
      (data) => {
        this.assessmentDetails = data;
        this.marksValue = this.assessmentDetails.marks;
        this.assessmentForm.get('marks')?.setValue(this.marksValue);  // Set form control value

      },
      error => {
        console.error('Error fetching assessment details:', error);
      }
    );
  }

  onMarksChange(event: any): void {
    this.marksValue = event.target.value;
  }

  transformEnumToString(value: string): string {
    if (!value) return '';
  
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .replace(/-/g, '-'); 

  }

  onSubmit(): void {
    if (this.assessmentForm.valid && this.assessmentDetails.studentId) {
      const studentId = this.assessmentDetails.studentId.id;
      const assessmentId = this.assessmentId
      const updatedAssessmentDetails: AssessmentDetail = {
        id: this.assessmentDetails.id,
        assessmentId: this.assessmentDetails.assessmentId,
        studentId: this.assessmentDetails.studentId,
        registrationId: this.assessmentDetails.registrationId,
        moduleCode: this.assessmentDetails.moduleCode,
        name: this.assessmentDetails.name,
        marks: this.assessmentForm.get('marks')?.value
      };
      
  
      this.apiService.updateAssessmentDetails(studentId, assessmentId, updatedAssessmentDetails).subscribe(
        response => {
          // Handle successful update, e.g., show success message
          console.log('Assessment details updated successfully', response);
          if (response === "Assessment details updated successfully!") {  
            this.handleSuccess();
          } else {
            this.handleError();
          }
        },
        error => {
          // Handle error, e.g., show error message
          console.error('Error updating assessment details', error);
          this.handleError();

        }
      );
    } else {
      console.error('Invalid form data or student ID is null');
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
