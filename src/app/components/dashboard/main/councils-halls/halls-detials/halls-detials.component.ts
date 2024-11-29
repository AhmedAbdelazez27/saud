import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../servicesApi/landing.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-halls-detials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './halls-detials.component.html',
  styleUrl: './halls-detials.component.scss'
})
export class HallsDetialsComponent implements OnInit{
  currentItem:any;
  constructor(
    private landingService: LandingService,
    private _SpinnerService: SpinnerService,
    private route:ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      let id = params['hallId']; // Access visitId from the URL     
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
