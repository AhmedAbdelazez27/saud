import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-lists',
  standalone: true,
  imports: [ CommonModule],
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


  constructor(private router:Router){

  }
  goDetails(id:any){
    this.router.navigate([`Main/Services/Details/${id}`]);
  }
}
