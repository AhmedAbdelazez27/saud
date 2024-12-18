import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// primeng modules
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../services/auth.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule,CarouselModule,RouterModule,TranslateModule],
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
  currentLanguage: string;


  constructor(private router: Router,private cartService: CartService,private translationService: TranslationService) {
    this.currentLanguage = localStorage.getItem('language') || 'en';
  }
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      console.log(count);
      
      this.cartCount = count;
    });
  }

  navigate(route: any): void {
    this.router.navigate([route]);
  }

  switchLanguage(lang: string) {
    this.translationService.changeLang(lang); // Call the translation service to change language
    this.currentLanguage = lang; // Update current language to reflect in the dropdown
  }
}
