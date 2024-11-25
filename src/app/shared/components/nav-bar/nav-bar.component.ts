import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// primeng modules
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../services/auth.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ CommonModule,CarouselModule],
  providers:[AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  constructor(){
  }
  campaigns = [
    {
      image: '../../../../assets/images/thumb-img-1.png',
      title: 'Emergency Campaign 1',
      requiredAmount: '100,000 AED',
      collectedAmount: '23,640 AED',
      progress: 50,
    },
    {
      image: '../../../../assets/images/thumb-img-1.png',
      title: 'Emergency Campaign 2',
      requiredAmount: '200,000 AED',
      collectedAmount: '50,000 AED',
      progress: 25,
    },
    {
      image: '../../../../assets/images/thumb-img-1.png',
      title: 'Emergency Campaign 3',
      requiredAmount: '150,000 AED',
      collectedAmount: '75,000 AED',
      progress: 50,
    },
  ];

  // Owl carousel options
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
    navText: ['<', '>'],
  };
}
