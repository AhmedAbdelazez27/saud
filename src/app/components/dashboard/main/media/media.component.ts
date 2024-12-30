import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutusService } from '../servicesApi/aboutus.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [TranslateModule,CommonModule,FormsModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent implements OnInit{
  currentIndex:any;
  itemMediaCenter: any[] = [];
  itemMediaCenterF: any[] = [];
  selectedMedia: any = null;
  currentLang: string = 'en'; // or 'ar', based on your logic

  constructor(
    private aboutService: AboutusService,
    private _SpinnerService: SpinnerService,
    private router: Router,
    private translate: TranslateService
  ){
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;
  }
  ngOnInit(): void {
    this.fetchingMediaCenterData();
  }
  fetchingMediaCenterData() {
    this._SpinnerService.showSpinner();
    this.aboutService.getmediaCenter().subscribe({
      next: (res) => {
        this._SpinnerService.hideSpinner();
        this.itemMediaCenter = res.result;

        this.itemMediaCenterF = this.itemMediaCenter.map((item: any) => ({
          ...item,
          title: this.currentLang === 'ar' ? item.titleAr : item.titleEn
        }));

        if (this.itemMediaCenterF.length > 0) {
          this.selectedMedia = this.itemMediaCenterF[this.currentIndex]; // Set the first item as the default
        }
      },
      error: (err) => {
        console.error(err);
        this._SpinnerService.hideSpinner();
      }
    });
  }

  onSlide(event: any) {
    // Access the current index from the event object
    const activeIndex = Array.from(event.target.querySelectorAll('.carousel-item')).findIndex((item: any) =>
      item.classList.contains('active')
    );
    this.currentIndex = activeIndex;
    this.selectedMedia = this.itemMediaCenterF[this.currentIndex];
    console.log('Current Index:', this.currentIndex);
  }

  selectedItem(i:number){
    this.currentIndex = i;
  }

}
