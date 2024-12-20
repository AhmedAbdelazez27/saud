import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../servicesApi/landing.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-councils-hall-lists',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './councils-hall-lists.component.html',
  styleUrl: './councils-hall-lists.component.scss'
})
export class CouncilsHallListsComponent implements OnInit{
  hallsList : any[]=[];
  councilsList : any[]=[];
  currentLang: string;

  constructor(
    private landingService: LandingService,
    private _SpinnerService: SpinnerService,
    private router: Router,
     private translate: TranslateService
      ) {
        this.currentLang = this.translate.currentLang || this.translate.defaultLang;
    
    console.log("CouncilsHallListsComponent");
  }
  ngOnInit(): void {
    this.gettingAllHalls();
    this.gettingAllCouncils();
  }

  gettingAllHalls(){
    this._SpinnerService.showSpinner();
    this.landingService.getAllHalls().subscribe({
      next: (res)=>{
        console.log(res.result);
        this.hallsList = res.result;
        this._SpinnerService.hideSpinner();
      }
    })
  };

  gettingAllCouncils(){
    this.landingService.getAllCouncils().subscribe({
      next: (res)=>{
        console.log(res.result);
        this.councilsList = res.result;
      }
    })
  }

  goDetails(route:any){
    this.router.navigate([route]);
  }

}
