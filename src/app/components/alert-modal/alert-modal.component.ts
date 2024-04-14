import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss'
})
export class AlertModalComponent {

  message: string | undefined;

  constructor(public bsModalRef: BsModalRef, private router: Router) { }

  ngOnInit(): void {
  }

  navigateToDataTable(): void {
    this.bsModalRef.hide();
    this.router.navigate(['/students-data-table']);
  }

}
