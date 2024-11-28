import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// primeng modules
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../services/auth.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule,CarouselModule,RouterModule],
  providers:[AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  routes = [
    { path: '/Main/Home', name: 'Home' },
    { path: '/Main/Services', name: 'Services' },
    { path: '/Main/Emergency', name: 'Emergency' },
  ];

  constructor(private router: Router) {}

  navigate(route: any): void {
    this.router.navigate([route]);
  }
}
