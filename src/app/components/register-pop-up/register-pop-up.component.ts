import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-register-pop-up',
  templateUrl: './register-pop-up.component.html',
  styleUrls: ['./register-pop-up.component.scss']
})
export class RegisterPopUpComponent {
  @Input() studentId!: number;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router
  ) {
    this.bsModalRef.onHidden?.subscribe(() => {
      console.log('Modal hidden event');
      if (this.studentId) {
        this.router.navigate(['/student', this.studentId]);
      }
    });
   }

   onRegister(): void {
    console.log('onRegister called');
    if (this.studentId) {
      this.bsModalRef.hide();
      setTimeout(() => {
        this.router.navigate(['/register-student', this.studentId]);
      }, 300); // 300 milliseconds delay
    } else {
      console.error('No student selected for registration.');
    }
  }
  

  




onClose(): void {
  // Navigate back to student-data-table component
  this.router.navigate(['/students-data-table']);
  this.bsModalRef.hide();
}
  
}
