import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingService } from '../../servicesApi/landing.service';

@Component({
  selector: 'app-emergency-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './emergency-details.component.html',
  styleUrl: './emergency-details.component.scss'
})
export class EmergencyDetailsComponent implements OnInit{
  emergencyItem:any;
  constructor(
    private landingService:LandingService,
    private route:ActivatedRoute,

  ){

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      let id = params['emergencyId']; // Access visitId from the URL
      console.log("iidd = ",id,params);
      
      this.getEmergencyDetails(id);

    });
  }

  getEmergencyDetails(id:any){
    this.landingService.getSingleEmergency(id).subscribe({
      next: (res)=>{
        console.log(res);
        this.emergencyItem = res.result
      }
    })
  }


}
