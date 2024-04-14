import { Component, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isNavbarFixed = false;

  constructor(private el: ElementRef, private route: ActivatedRoute) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const header = this.el.nativeElement.querySelector('.content') as HTMLElement;
    const navbar = this.el.nativeElement.querySelector('.navbar') as HTMLElement;

    // Check if current route is signup
    const isSignup = this.route.snapshot.component?.name === 'SignupComponent';

    if (window.scrollY > header.clientHeight && isSignup) {
      this.isNavbarFixed = true;
      navbar.classList.add('fixed-top');
    } else {
      this.isNavbarFixed = false;
      navbar.classList.remove('fixed-top');
    }
  }
}
