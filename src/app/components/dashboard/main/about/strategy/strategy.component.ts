import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AboutusService } from '../../servicesApi/aboutus.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LandingService } from '../../servicesApi/landing.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [CommonModule,TranslateModule,CarouselModule,FormsModule,ImageModule],
  templateUrl: './strategy.component.html',
  styleUrl: './strategy.component.scss'
})
export class StrategyComponent implements OnInit {
  
  aboutStrategy: any[] = []; // Explicitly set the type
  websiteStatistic: any[] = [];
  currentLang: string;
  cooperations: any;
  certificates: any;
  customOptionsPartners: OwlOptions;
  customOptions?: OwlOptions;
  partners: any;
  @ViewChild('imagePreview', { static: false }) imagePreview!: ElementRef;
  currentImgSrc ?: string;
  currentImgName ?: string;

  constructor(
    private _AboutusService: AboutusService,
    private router: Router,
    private _SpinnerService: SpinnerService, private translate: TranslateService,
    private landingService:LandingService
  ){
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;
  
    const currentLanguage = localStorage.getItem('language') || 'en'; 
    if (currentLanguage == 'ar') {
      this.customOptions = {
        rtl: true, 
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 }, 
          600: { items: 2 },
          1000: { items: 3 }, 
        },
        navText: [ '<span class="custom-prev">&lt;</span>', 
    '<span class="custom-next">&gt;</span>' 
     ], 
      };
      this.customOptionsPartners = {
        rtl: true,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2},
          1000: { items: 4},
        },
        navText: [ '<span class="custom-prev">&lt;</span>', 
    '<span class="custom-next">&gt;</span>'
     ], // Keep it as-is
      };
    } else {
      this.customOptions = {
        loop: true, 
        margin: 10, 
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 }, 
          1000: { items: 3 }, 
        },
        navText: [ '<span class="custom-prev">&lt;</span>',
    '<span class="custom-next">&gt;</span>' 
     ], 
      };
      this.customOptionsPartners = {
        loop: true,
        margin: 5,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 4,
          },
        },
        navText: [ '<span class="custom-prev">&lt;</span>', // Add custom class for "Previous"
    '<span class="custom-next">&gt;</span>'  // Add custom class for "Next"
     ],
      };
      console.log(this.customOptionsPartners);
      
    }
  }

  ngOnInit(): void {
    this.gettingAboutInfo();
    this.getAllWebsiteStatistic();
    this.getCertificates();
    this.getTaawon();
    this.getCooperations();

  }


  gettingAboutInfo() {
    this._SpinnerService.showSpinner();
    this._AboutusService.aboutStrtegies().subscribe({
      next: (res) => {
        console.log(res.result);
        this.aboutStrategy = [...res.result as any[]]; // Cast result to the correct type
        this._SpinnerService.hideSpinner();
      },
      error: (err) => {
        this._SpinnerService.hideSpinner();
      }
    });
  };


  animatedValues: number[] = []; // Array to store animated values
  getAllWebsiteStatistic(){
   this._AboutusService.aboutWebsiteStatistic().subscribe({
    next : (res)=>{
      this.websiteStatistic = res.result ;

       // Initialize animation for each statistic
    this.websiteStatistic.forEach((stat, index) => {
      this.animateCounter(0, stat.value, 10, (currentValue) => {
        this.animatedValues[index] = currentValue;
      });
    });
    }
   })
  }

  animateCounter(
    startValue: number,
    endValue: number,
    duration: number,
    callback: (currentValue: number) => void
  ): void {
    const stepTime = 10;
    const step = (endValue - startValue) / (duration * 100);
    let current = startValue;

    const intervalId = setInterval(() => {
      current += step;

      if (current >= endValue) {
        callback(endValue);
        clearInterval(intervalId);
      } else {
        callback(Math.floor(current));
      }
    }, stepTime);
  };

  getCooperations(){
    this._AboutusService.getcertificates(12483).subscribe({
      next: (res)=>{
        this.cooperations =res.result ;
      }
    })
  }
  getTaawon(){
    this._AboutusService.getcertificates(12481).subscribe({
      next: (res)=>{
        this.partners =[...res.result] ;
      }
    })
  }
  getCertificates(){
    this._AboutusService.getcertificates(12482).subscribe({
      next: (res)=>{
        this.certificates =res.result ;
      }
    })
  }
  openPreview(imgSrc: string="",name:string="") {
    this.currentImgSrc = imgSrc;
    this.currentImgName = name;
  }
}
