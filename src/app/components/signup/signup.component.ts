import { Component } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  form: any = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    role: '-'
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  goToLandingPage(): void {
    setTimeout(() => {
      this.router.navigate(['/landing']);  // Navigate to the LandingComponent after 3 seconds
    }, 1000);  // Delay for 1 second
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);  // Navigate to the SignupComponent
  }

  onSubmit() {
    const { fullname, username, email, password, role } = this.form;

    console.log('Submitting form:', this.form);  // Debugging log

    this.authService.signUp(fullname, username, email, password, role).subscribe({
      next: data => {
        console.log('Signup successful:', data);  // Debugging log
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        // Redirect to landing page after a delay
        this.goToLandingPage();
      },
      error: err => {
        console.error('Signup failed:', err);  // Debugging log
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
