import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutusService } from '../servicesApi/aboutus.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent implements OnInit{
  currentLang: string;
  itemMediaCenter: any[]=[];

  itemMediaCenterF: any[] = [];
  selectedMedia: any = null;

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

  fetchingMediaCenterData(){
    this._SpinnerService.showSpinner();
    this.aboutService.getmediaCenter().subscribe({
      next:(res)=>{
        this._SpinnerService.hideSpinner();
        console.log(res);
        this.itemMediaCenter = res.result;

        this.itemMediaCenterF = res.result.map((item:any) => ({
          ...item,
          title: this.currentLang === 'ar' ? item.titleAr : item.titleEn
        }));
        if (this.itemMediaCenter.length > 0) {
          this.selectedMedia = this.itemMediaCenterF[2]; // Default selection
        }
      },
      error:(err)=>{
        console.log(err);
        this._SpinnerService.hideSpinner();
      }
    })
  }

}
