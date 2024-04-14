import { Component, ViewChild, Renderer2, ElementRef, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StudentApiService } from '../../services/student/student.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-edit-student-profile',
  templateUrl: './edit-student-profile.component.html',
  styleUrls: ['./edit-student-profile.component.scss']
})
export class EditStudentProfileComponent {

  @Input() studentId?: number | null;
  studentForm: FormGroup;

  student: any = {
    id: null,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    emergencyContact: '',
    address: ''
  };

  originalStudent: any = {};

  errorMessage: string | null = null;
  successMessage: string | null = null;

  isSuccess: boolean = false;

  @ViewChild('editStudentModal', { static: false }) editStudentModal!: ElementRef;
  @Output() openModalEvent = new EventEmitter<void>();

  constructor(
    private renderer: Renderer2,

    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private apiService: StudentApiService,
    private router: Router,
    private route: ActivatedRoute



  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      emergencyContact: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    if (this.studentId) {
      console.log("Student Id: ", this.studentId)
      this.getStudentDetails(this.studentId);
    }
  }

  openEditStudentProfile(studentId: number): void {
    this.apiService.getStudentById(studentId).subscribe(
      (data) => {
        this.student = data;
        this.showModal();
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  getStudentDetails(studentId: number): void {
    this.apiService.getStudentById(studentId).subscribe(
      (data: any) => {
        this.student = { ...data };  // Create a copy to avoid direct mutations
        this.originalStudent = { ...data };  // Store the original student object
        this.studentForm.patchValue(this.student);
      },
      error => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  onSubmit(): void {
    // Update the student object with the latest form values
    this.student = this.studentForm.value;

    // Compare the objects directly
    if (JSON.stringify(this.student) !== JSON.stringify(this.originalStudent)) {
      const editedFields = this.getEditedFields(this.student, this.originalStudent);

      // Call the editStudent API method only if there are edited fields
      if (Object.keys(editedFields).length > 0) {
        this.apiService.editStudent(this.studentId!, editedFields).subscribe(
          response => {
            this.handleResponse(response);
          },
          error => {
            console.error('Error updating student:', error);
          }
        );
      } else {
        console.log('No fields edited.');
      }
    } else {
      console.log('No fields edited.');
    }
  }

  private handleResponse(response: any): void {
    try {
      if (response && response.trim() === "Student details updated successfully!") {
        console.log('Student Profile Update successful!');
        this.handleSuccess();
      } else {
        console.log('Student Profile Update failed due to unknown error.');
        this.handleError("An unknown error occurred.");
      }
    } catch (error) {
      console.error('Error handling response:', error);
      this.handleError("An error occurred while processing the response.");
    }
  }

  private handleSuccess(): void {
    this.isSuccess = true;
    this.successMessage = "Student profile updated successfully!";
    this.errorMessage = '';


    // Redirect to student details component and refresh after a delay
    setTimeout(() => {
      if (this.bsModalRef) {
        this.bsModalRef.hide();
        this.apiService.triggerStudentUpdate();

      }
    }, 1000);
  }

  private handleError(error: any): void {
    console.log('Student Profile Update failed:', error);
    this.errorMessage = "An error occurred while updating the student profile.";
    this.successMessage = null; // Clear success message

  }


  getEditedFields(student: any, originalStudent: any): any {
    const editedFields: any = {};

    Object.keys(student).forEach(key => {
      if (JSON.stringify(student[key]) !== JSON.stringify(originalStudent[key])) {
        editedFields[key] = student[key];
      }
    });

    return editedFields;
  }



  showModal(): void {
    const modal = this.editStudentModal.nativeElement;
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'block');
    document.body.classList.add('modal-open');
  }



}
