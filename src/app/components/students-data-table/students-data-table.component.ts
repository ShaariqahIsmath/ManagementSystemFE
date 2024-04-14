import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentApiService } from '../../services/student/student.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterPopUpComponent } from '../register-pop-up/register-pop-up.component';
import { Student } from '../../management.model';

@Component({
  selector: 'app-students-data-table',
  templateUrl: './students-data-table.component.html',
  styleUrls: ['./students-data-table.component.scss']
})
export class StudentsDataTableComponent implements OnInit {

  @ViewChild(RegisterPopUpComponent) registerModal!: RegisterPopUpComponent;
  students: any[] = [];
  modalRef: BsModalRef | undefined;

  
  constructor(private apiService: StudentApiService, private router: Router, private modalService: BsModalService
    ) { }

    ngOnInit(): void {
      this.fetchStudents();

    }
  
  fetchStudents(): void {
    this.apiService.getAllStudents().subscribe(
      (data: Student[]) => {
        this.students = data;
        this.sortStudentsById(); // Call the sorting method after fetching students
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  sortStudentsById(): void {
    this.students.sort((a, b) => a.id - b.id); // Sort the students array by their 'id' in ascending order
  }
  
  onRowClick(studentId: number): void {
    const selectedStudent = this.students.find(student => student.id === studentId);
    if (selectedStudent && !selectedStudent.registration?.id) {
      const initialState = { studentId: studentId };
      this.modalRef = this.modalService.show(RegisterPopUpComponent, { initialState });
      
      // Subscribe to the modal's onHidden event
      this.modalRef?.onHidden?.subscribe(() => {
        // Navigate to the student-data-table component after modal is hidden
        this.router.navigate(['/students-data-table']);
      });
  
    } else {
      this.router.navigate(['/student', studentId]);
    }
  }
  

  transformEnumToString(value: string): string {
    if (!value) return '';
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
