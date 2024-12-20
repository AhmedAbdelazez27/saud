import { Component, OnInit } from '@angular/core';
import { AboutusService } from '../../servicesApi/aboutus.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './strategy.component.html',
  styleUrl: './strategy.component.scss'
})
export class StrategyComponent implements OnInit {
  
  aboutStrategy: any[] = []; // Explicitly set the type
  websiteStatistic: any[] = [];
  currentLang: string;

  constructor(
    private _AboutusService: AboutusService,
    private router: Router,
    private _SpinnerService: SpinnerService, private translate: TranslateService
  ){
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;}

  ngOnInit(): void {
    this.gettingAboutInfo();
    this.getAllWebsiteStatistic();
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
}
