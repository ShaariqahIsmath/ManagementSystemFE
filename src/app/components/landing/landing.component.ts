import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})


export class LandingComponent {

  constructor(private router: Router) { }

  goToSignUp() {
    this.router.navigate(['/sign-up']);  // Navigate to the SignupComponent
  }
  
  goToSignIn() {
    this.router.navigate(['/login']);  // Navigate to the LoginComponent
  }
  

  

}
