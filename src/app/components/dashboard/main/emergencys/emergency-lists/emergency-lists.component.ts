import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-lists',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './emergency-lists.component.html',
  styleUrl: './emergency-lists.component.scss'
})
export class EmergencyListsComponent {
  constructor(private router:Router){}
  campaigns = [
    {
      title: 'Emergency',
      requiredAmount: '100,000 AED',
      collectedAmount: '23,640 AED',
      progress: 23,
      image: '../../../../../../assets/images/thumb-img-1.png',
    },
    {
      title: 'Medical Aid',
      requiredAmount: '200,000 AED',
      collectedAmount: '180,000 AED',
      progress: 90,
      image: '../../../../../../assets/images/thumb-img-1.png',
    },
    {
      title: 'Education Support',
      requiredAmount: '150,000 AED',
      collectedAmount: '75,000 AED',
      progress: 50,
      image: '../../../../../../assets/images/thumb-img-1.png',
    },
  ];

  goDetails(id:any){
    this.router.navigate([`Main/Emergency/Details/${id}`]);
  }
}
