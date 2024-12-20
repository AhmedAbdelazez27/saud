import { Component, OnInit } from '@angular/core';
import { AboutusService } from '../../servicesApi/aboutus.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnInit{
  websiteAboutUs:any;
  listWebsiteAboutUsBranchs:any;
  listWebsiteAboutUsDept:any;
  currentLang: string;

  constructor(
    private _AboutusService:AboutusService,
    private router : Router,
    private _SpinnerService: SpinnerService,
    private translate: TranslateService
  ){
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;
  }

  ngOnInit(): void {
    this.gettingAboutInfo();
  }

  gettingAboutInfo(){
    this._SpinnerService.showSpinner();
    this._AboutusService.aboutGeneralInfo().subscribe({
      next : (res)=>{
        console.log(res.result[0]);
        this.websiteAboutUs = res.result[0]?.websiteAboutUs;
        this.listWebsiteAboutUsBranchs = res.result[0]?.listWebsiteAboutUsBranchs;
        this.listWebsiteAboutUsDept = [...res.result[0]?.listWebsiteAboutUsDept];
        this._SpinnerService.hideSpinner();
      },
      error : (err)=>{
        this._SpinnerService.hideSpinner();
      }
    })
  }

  navigateToUrl(url:string): void {
    this.router.navigate([url]); // Replace with your desired route
  }
}
