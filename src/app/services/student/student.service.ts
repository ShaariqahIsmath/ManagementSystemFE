
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AssessmentDetail, Registration, Student } from '../../management.model';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {
  private baseUrl =  'http://localhost:8080'; // Update with your base URL
  private httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };



  constructor(private http: HttpClient) { }

  createStudent(student: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.baseUrl}/students/add`,
      student,
      { headers, responseType: 'text' } // specify responseType as 'text'
    ).pipe(
      tap(response => {
        console.log('API Response:', response);
        if (response === 'Student profile created successfully!') {
          return response; // return the string message directly
        } else {
          return JSON.parse(response); // parse the JSON response
        }
      }),
      catchError(error => {
        console.error('API Error:', error);
        throw error; // re-throwing the error to be caught by the component
      })
    );
  }

  private studentUpdatedSource = new Subject<void>();
  studentUpdated$ = this.studentUpdatedSource.asObservable();

  triggerStudentUpdate(): void {
    this.studentUpdatedSource.next();
  }

  getStudentById(id: number): Observable<Student> {
    const url = `${this.baseUrl}/students/${id}`;
    return this.http.get<Student>(url);
  }
  

  getAllStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`, this.httpHeader);
  }

  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/students/delete/${studentId}`, { responseType: 'text' as 'json' });
  }

  registerStudent(studentId: number, registrationDto: any): Observable<any> {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/registration/register-student/${studentId}/enrol`;
    return this.http.post(url, registrationDto, { headers: headers });
  }

  getAssessmentDetails(studentId: number, assessmentId: number){
    const url = `${this.baseUrl}/assessment/${studentId}/${assessmentId}`;
    return this.http.get<AssessmentDetail>(url)

  }
  

  getAllCourses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/courses`);
  }

  getAllDepartments(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/departments`);
  }

  editStudent(studentId: number, updatedFields: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/students/${studentId}/update`, updatedFields, { responseType: 'text' as 'json' });
  }
  
  

  updateAssessmentDetails(studentId: number, assessmentId: number, updatedAssessmentDetails: AssessmentDetail): Observable<string> {
    const url = `${this.baseUrl}/assessment/${studentId}/update/${assessmentId}`;
    return this.http.put<string>(url, updatedAssessmentDetails, { responseType: 'text' as 'json' })
    .pipe(
        catchError(this.handleError)
      );
  }

  updateRegistrationDetails(registrationId: string, updatedRegistration: Registration): Observable<string> {
    const url = `${this.baseUrl}/registration/update/${registrationId}`;
    return this.http.put<string>(url, updatedRegistration, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
