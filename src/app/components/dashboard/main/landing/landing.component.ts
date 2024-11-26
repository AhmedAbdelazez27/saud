import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LandingService } from '../servicesApi/landing.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';

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
  campaigns = [
    {
      image: '../../../../../assets/images/thumb-img-1.png',
      title: 'Emergency Campaign 1',
      requiredAmount: '100,000 AED',
      collectedAmount: '23,640 AED',
      progress: 50,
    },
    {
      image: '../../../../../assets/images/thumb-img-1.png',
      title: 'Emergency Campaign 2',
      requiredAmount: '200,000 AED',
      collectedAmount: '50,000 AED',
      progress: 25,
    },
    {
      image: '../../../../../assets/images/thumb-img-1.png',
      title: 'Emergency Campaign 3',
      requiredAmount: '150,000 AED',
      collectedAmount: '75,000 AED',
      progress: 50,
    },
  ];

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
    private _SpinnerService: SpinnerService
  ) {

  }
  ngOnInit(): void {
    this.gettingSliderData();
    this.getListEmergenys();
    this.getAllWebsiteStatistic();
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
        this.campaigns1 = res.result.items.filter((item: { isActive: any; }) => item.isActive).map((item: { projectCampainName: any; projectCampainDesc: any; projectCampainNameEn: any; projectCampainDescEn: any; targetAmount: number; totalAmount: number; }) => {
          return {
            id: 1,
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

  getAllWebsiteStatistic(){
   this.landingService.getAllWebsiteStatistic().subscribe({
    next : (res)=>{
      this.websiteStatistic = res.result ;
      console.log(this.websiteStatistic);
    }
   })
  }
}
