import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']  // Fixed the styleUrl to styleUrls
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  profileImage: any;  // To store the profile picture
  imageName: string | null = null;  // Property to store the uploaded image name
  isLogoutSuccessful = false;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  onFileChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageName = file.name;  // Store the uploaded image name
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.profileImage = reader.result;
      };
    }
  }

  logout(): void {
    this.authService.logout().subscribe(
      data => {
        this.isLogoutSuccessful = true;
        this.router.navigate(['/login']); // Redirect to login page after successful logout
      },
      error => {
        console.error('Logout failed:', error);
        this.isLogoutSuccessful = false;
      }
    );
  }
}
