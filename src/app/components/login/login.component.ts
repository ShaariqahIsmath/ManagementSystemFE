import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn: boolean = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.roles = this.storageService.getUser().roles;
    }
  }

  goToSignIn() {
    this.router.navigate(['/login']);  // Navigate to the SignupComponent
  }

  onSubmit(): void {
    const { username, password } = this.form;
  
    this.authService.login(username, password).subscribe(
      data => {
        this.storageService.saveUser(data);
        this.authService.setAuthenticated(true); // Set authenticated to true
  
        this.isLoginFailed = false;
        this.roles = this.storageService.getUser().roles;
  
        // Display success message after a successful login
        this.isLoggedIn = true;
  
        // Set user details using the data returned from the login API
        this.userService.setUser(data);  // set user details
  
        // Delay for 2 seconds before redirecting to homepage
        setTimeout(() => {
          if (this.authService.isAuthenticated) {
            this.router.navigate(['/home']); // Redirect to homepage if authenticated
          } else {
            this.router.navigate(['/landing']); // Redirect to landing page if not authenticated
          }
        }, 1000); // 1000 milliseconds = 1 second delay
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false; // Ensure isLoggedIn is set to false on login failure
      }
    );
  }
  
  
}
