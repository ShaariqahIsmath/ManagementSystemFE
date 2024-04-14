import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDataTableComponent } from './students-data-table.component';

describe('StudentsDataTableComponent', () => {
  let component: StudentsDataTableComponent;
  let fixture: ComponentFixture<StudentsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
