import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentAssessmentsComponent } from './edit-student-assessments.component';

describe('EditStudentAssessmentsComponent', () => {
  let component: EditStudentAssessmentsComponent;
  let fixture: ComponentFixture<EditStudentAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStudentAssessmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStudentAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
