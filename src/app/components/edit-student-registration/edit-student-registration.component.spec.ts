import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentRegistrationComponent } from './edit-student-registration.component';

describe('EditStudentRegistrationComponent', () => {
  let component: EditStudentRegistrationComponent;
  let fixture: ComponentFixture<EditStudentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStudentRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStudentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
