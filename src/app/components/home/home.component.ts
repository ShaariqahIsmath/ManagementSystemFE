import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  displayHeader: boolean = true;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);  // Redirect to the homepage
    }
    this.route.url.subscribe(url => {
      // Check if the current route is one of the specified routes
      if (url.some(u => ['signup', 'login', 'landing'].includes(u.path))) {
        this.displayHeader = false;
      } else {
        this.displayHeader = true;
      }
    });
  }
}
