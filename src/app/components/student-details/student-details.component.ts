import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StudentApiService } from '../../services/student/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseType, DepartmentName } from '../../management.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditStudentProfileComponent } from '../edit-student-profile/edit-student-profile.component';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { EditStudentRegistrationComponent } from '../edit-student-registration/edit-student-registration.component';
import { EditStudentAssessmentsComponent } from '../edit-student-assessments/edit-student-assessments.component';
import { EditAssessmentModalInitialState } from '../../management.model';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  @ViewChild('editStudentModal') editStudentProfile!: EditStudentProfileComponent;
  @ViewChild('successModal') successModal: any;
  @ViewChild('editAssessmentModal') editAssessmentsModal!: EditStudentAssessmentsComponent;


  studentId?: number | null;
  student: any = {};
  courses: any[] = [];
  studentForm: FormGroup = new FormGroup({});
  registrationMethods: string[] = ['In-person', 'Online'];
  registrationSources: string[] = ['Event', 'Website', 'Email Campaign', 'In-person'];
  isEditing = false;
  bsModalRef: BsModalRef | undefined;
  hasMarks = false; // Initialize as false


  constructor(
    private route: ActivatedRoute,
    private apiService: StudentApiService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private cdRef: ChangeDetectorRef,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.fetchCourses();
    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      if (this.studentId) {
        this.loadStudentDetails(this.studentId);
      }
    });
    this.initializeForm();


    this.apiService.studentUpdated$.subscribe(() => {
      this.loadStudentDetails(this.studentId!);
    });
  }

  get departmentName(): string {
    return this.student?.department?.name 
      ? DepartmentName[this.student.department.name as keyof typeof DepartmentName] 
      : 'Unknown Department';
  }
  
  get courseType(): string {
    return this.student?.course?.type 
      ? CourseType[this.student.course.type as keyof typeof CourseType] 
      : 'Unknown Type';
  }

  fetchCourses(): void {
    this.apiService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onEditStudentClick(studentId: number): void {
    console.log('Edit button clicked');
    this.openEditModal(studentId); 
  }

  openEditModal(studentId: number): void {
    if (studentId) {
      const initialState = {
        studentId: studentId
      };
      this.bsModalRef = this.modalService.show(EditStudentProfileComponent, { initialState });
      console.log('Modal opened:', this.bsModalRef);
    } else {
      console.error('Invalid student ID');
    }
  }

  
  onEditRegistrationClick(studentId: number): void {
    console.log('Edit button clicked');
    this.openEditRegistrationModal(studentId); 
  }

  openEditRegistrationModal(studentId: number): void {
    if (studentId) {
      const initialState = {
        studentId: studentId
      };
      this.bsModalRef = this.modalService.show(EditStudentRegistrationComponent, { initialState });
      console.log('Modal opened:', this.bsModalRef);
    } else {
      console.error('Invalid student ID');
    }  
  }

    onEditAssessmentClick(studentId: number, assessmentId: number): void{
      console.log(`Clicked on Edit for Student ID: ${studentId}, Assessment ID: ${assessmentId}`);
      this.openEditAssessmentModal(studentId, assessmentId)
      
    }

    openEditAssessmentModal(studentId: number, assessmentId: number): void {
      if(studentId && assessmentId){
        const initialState = {
          studentId: studentId,
          assessmentId: assessmentId
        }; 
        this.bsModalRef = this.modalService.show(EditStudentAssessmentsComponent, { initialState });
        console.log('Modal opened:', this.bsModalRef);


      }

      // In your component's TypeScript file


    }
    
    getAssessmentMarks(assessment: any): number {
      const marks = assessment?.marks;
      if (marks !== null && marks !== undefined) {
        this.hasMarks = true;
        return marks;
      }
      this.hasMarks = false;
      return 0;
    }
    

    


  
  deleteStudent(studentId: number): void {
    console.log('Delete button clicked');
    if (studentId) {
      this.apiService.deleteStudent(studentId).subscribe(
        () => {
          console.log('Student deleted successfully');
  
          // Display success modal
          const initialState = {
            message: 'Successfully deleted student!'
          };
          this.bsModalRef = this.modalService.show(AlertModalComponent, { initialState });
  
          // Close the modal and navigate to "students-data-table" after a delay
          setTimeout(() => {
            this.bsModalRef?.hide();
            this.router.navigate(['/students-data-table']);
          }, 2000); // 2 seconds delay
        },
        error => {
          console.error('Error deleting student:', error);
        }
      );
    } else {
      console.error('Invalid student ID');
    }
  }
  
  
  showSuccessModal(): void {
    // Open the modal
    if (this.successModal) {
      this.successModal.nativeElement.classList.add('show');
      this.successModal.nativeElement.style.display = 'block';
    }
  
    // Close the modal after 3 minutes (180000 milliseconds)
    setTimeout(() => {
      if (this.successModal) {
        this.successModal.nativeElement.classList.remove('show');
        this.successModal.nativeElement.style.display = 'none';
      }
      this.router.navigate(['/students-data-table']);
    }, 120000); // 2 minutes delay
  }
  

  goToLandingPage(): void {
    setTimeout(() => {
      this.router.navigate(['/students-data-table']);  // Navigate to the LandingComponent after 3 seconds
    }, 1000);  // Delay for 1 second
  }

  

  navigateBack(): void {
    this.router.navigate(['/students-data-table']);
  }
  

  loadStudentDetails(id: number): void {
    this.apiService.getStudentById(id).subscribe(
      (data) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      firstName: [this.student?.firstName || '', Validators.required],
      lastName: [this.student?.lastName || '', Validators.required],
      dateOfBirth: [this.student?.dateOfBirth || '', Validators.required],
      email: [this.student?.email || '', [Validators.required, Validators.email]],
      phone: [this.student?.phone || ''],
      emergencyContact: [this.student?.emergencyContact || ''],
      address: [this.student?.address || ''],
      department: this.fb.group({
        name: [this.student?.department?.name ? DepartmentName[this.student.department.name as keyof typeof DepartmentName] : '', Validators.required],
        inCharge: [this.student?.department?.inCharge || '']
      }),
      course: this.fb.group({
        name: [this.student?.course?.name || '', Validators.required],
        type: [this.student?.course?.type ? CourseType[this.student.course.type as keyof typeof CourseType] : '', Validators.required]
      }),
      registration: this.fb.group({
        registrationDate: [this.student?.registration?.registrationDate || '', Validators.required],
        registrationMethod: [this.student?.registration?.registrationMethod || '', Validators.required],
        registrationSource: [this.student?.registration?.registrationSource || '', Validators.required]
      })
    });
  }


  testClick(): void {
    console.log('Button clicked');
  }

}
