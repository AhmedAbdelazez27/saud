import { Component, OnInit } from '@angular/core';
import { AboutusService } from '../../servicesApi/aboutus.service';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnInit{
  websiteAboutUs:any;
  listWebsiteAboutUsBranchs:any;
  listWebsiteAboutUsDept:any;

  constructor(private _AboutusService:AboutusService){

  }

  ngOnInit(): void {
    this.gettingAboutInfo();
  }

  gettingAboutInfo(){
    this._AboutusService.aboutGeneralInfo().subscribe({
      next : (res)=>{
        console.log(res.result[0]);
        this.websiteAboutUs = res.result[0]?.websiteAboutUs;
        this.listWebsiteAboutUsBranchs = res.result[0]?.listWebsiteAboutUsBranchs;
        this.listWebsiteAboutUsDept = res.result[0]?.listWebsiteAboutUsDept;
        
      },
      error : (err)=>{

      }
    })
  }

}
