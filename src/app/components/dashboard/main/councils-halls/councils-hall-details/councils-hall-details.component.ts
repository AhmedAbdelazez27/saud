import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../servicesApi/landing.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-councils-hall-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './councils-hall-details.component.html',
  styleUrl: './councils-hall-details.component.scss'
})
export class CouncilsHallDetailsComponent implements OnInit{
  currentItem:any;
  constructor(
    private landingService: LandingService,
    private _SpinnerService: SpinnerService,
    private route:ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      let id = params['councilId']; // Access visitId from the URL
      console.log("iidd = ",id,params);
      
      this.gettingSingleHallCouncil(id);

    });
  }

  gettingSingleHallCouncil(id:any){
    this._SpinnerService.showSpinner();
    this.landingService.getSingleHallCouncils(id).subscribe({
      next: (res)=>{
        console.log(res.result);
        this.currentItem = res.result;
        this._SpinnerService.hideSpinner();
      }
    })
  }

}
