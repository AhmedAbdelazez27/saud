import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandingService } from '../../servicesApi/landing.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services-lists',
  standalone: true,
  imports: [ CommonModule,TranslateModule],
  templateUrl: './services-lists.component.html',
  styleUrl: './services-lists.component.scss'
})
export class ServicesListsComponent {
  
  projects = [
    {
      id: 1,
      title: 'مشروع النقل',
      description:
        'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص.',
      image: '../../../../../../assets/images/thumb-img-1.png',
      primaryActionText: 'تسجيل طلب باص',
      secondaryActionText: 'More...',
    },
    {
      id: 2,
      title: 'مشروع آخر',
      description:
        'هذا نص توضيحي لمشروع آخر لإظهار الديناميكية.',
      image: '../../../../../../assets/images/thumb-img-1.png',
      primaryActionText: 'تسجيل الآن',
      secondaryActionText: 'التفاصيل',
    },
  ];
  currentLang: string;


  constructor(
    private router:Router,
    private landingService:LandingService,
    private translate: TranslateService
    ) {
      this.currentLang = this.translate.currentLang || this.translate.defaultLang;

  }



  goDetails(route:string){
    this.router.navigate([`${route}`]);
  }

}
