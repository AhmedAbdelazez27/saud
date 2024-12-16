import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// primeng modules
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../services/auth.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule,CarouselModule,RouterModule],
  providers:[AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{


  routes = [
    { path: '/Main/Home', name: 'Home' },
    { path: '/Main/Services', name: 'Services' },
    { path: '/Main/Emergency', name: 'Emergency' },
  ];
  cartCount: number=0;

  constructor(private router: Router,private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      console.log(count);
      
      this.cartCount = count;
    });
  }

  navigate(route: any): void {
    this.router.navigate([route]);
  }
}
