import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LandingService } from '../servicesApi/landing.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  sliderItems: any[] = [];
  websiteStatistic: any[] = [];
  donationsItems: any[] = [];
  coupons : any[] = [];

  campaigns1: any[] = [];

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

  constructor(
    private landingService: LandingService,
    private _SpinnerService: SpinnerService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.gettingSliderData();
    this.getListEmergenys();
    this.getAllWebsiteStatistic();
    this.getAllTmAutoCouponsForWebsite();
  }

  gettingSliderData() {
    this._SpinnerService.showSpinner();
    this.landingService.getSlider().subscribe({
      next: (res) => {
        this.sliderItems = res.result.filter((item: { isActive: any; }) => item.isActive);
        console.log(res);
        this._SpinnerService.hideSpinner();
        this.gettingDonations();
      },
      error: (err) => {
        console.log(err);
        this.gettingDonations();
      }
    })
  }

  gettingDonations() {
    this.landingService.getDonations().subscribe({
      next: (res) => {
        this.donationsItems = res.result.filter((item: { isActive: any; }) => item.isActive);
      },
      error: (err) => {
      }
    })
  }

  getListEmergenys() {
    this.landingService.getEmergencys().subscribe({
      next: (res) => {
        this.campaigns1 = res.result.map((item: {
          id: any; projectCampainName: any; projectCampainDesc: any; projectCampainNameEn: any; projectCampainDescEn: any; targetAmount: number; totalAmount: number; 
}) => {
         console.log("id = ",item?.id);
         
          return {
            id: item.id,
            title: item?.projectCampainName,
            description: item?.projectCampainDesc,
            titleEn: item?.projectCampainNameEn,
            descriptionEn: item?.projectCampainDescEn,
            requiredAmount: `${item?.targetAmount} AED`,
            collectedAmount: `${item?.totalAmount} AED`,
            progress: item?.targetAmount > 0 ? (item?.totalAmount / +item.targetAmount * 100).toFixed(2) : 0,
            image: '../../../../../../assets/images/thumb-img-1.png',
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  animatedValues: number[] = []; // Array to store animated values
  getAllWebsiteStatistic(){
   this.landingService.getAllWebsiteStatistic().subscribe({
    next : (res)=>{
      this.websiteStatistic = res.result ;

       // Initialize animation for each statistic
    this.websiteStatistic.forEach((stat, index) => {
      this.animateCounter(0, stat.value, 10, (currentValue) => {
        this.animatedValues[index] = currentValue;
      });
    });
      console.log(this.websiteStatistic);
    }
   })
  }

  goDetailsEmergency(emergencyId:any){
    this.router.navigate([`Main/Emergency/Details/${emergencyId}`]);
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

  getAllTmAutoCouponsForWebsite(){
    this.landingService.getAllTmAutoCouponsForWebsite().subscribe({
      next :(res)=>{
        console.log(res.result);
        this.coupons = res.result;
      }
    })
  }
}
 