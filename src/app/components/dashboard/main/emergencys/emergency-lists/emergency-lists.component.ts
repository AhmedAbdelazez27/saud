import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingService } from '../../servicesApi/landing.service';

@Component({
  selector: 'app-emergency-lists',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './emergency-lists.component.html',
  styleUrl: './emergency-lists.component.scss'
})
export class EmergencyListsComponent implements OnInit{
  campaigns: any[] = [];
  constructor(
    private router:Router,
    private landingService: LandingService
  ){}
  ngOnInit(): void {
    this.getListEmergenys();
  }
  // campaigns = [
  //   {
  //     title: 'Emergency',
  //     requiredAmount: '100,000 AED',
  //     collectedAmount: '23,640 AED',
  //     progress: 23,
  //     image: '../../../../../../assets/images/thumb-img-1.png',
  //   },
  //   {
  //     title: 'Medical Aid',
  //     requiredAmount: '200,000 AED',
  //     collectedAmount: '180,000 AED',
  //     progress: 90,
  //     image: '../../../../../../assets/images/thumb-img-1.png',
  //   },
  //   {
  //     title: 'Education Support',
  //     requiredAmount: '150,000 AED',
  //     collectedAmount: '75,000 AED',
  //     progress: 50,
  //     image: '../../../../../../assets/images/thumb-img-1.png',
  //   },
  // ];

  getListEmergenys(){
    // this._SpinnerService.showSpinner();
    this.landingService.getEmergencys().subscribe({
      next: (res)=>{
        console.log(res);
        
        this.campaigns= res.result.items.filter((item: { isActive: any; })=> item.isActive).map((item: { projectCampainName: any; projectCampainDesc: any; projectCampainNameEn: any; projectCampainDescEn: any; targetAmount: number; totalAmount: number; })=>{
          return {  
            id: 1,
            title: item?.projectCampainName,
            description: item?.projectCampainDesc,
            titleEn: item?.projectCampainNameEn,
            descriptionEn: item?.projectCampainDescEn,
            requiredAmount: `${item?.targetAmount } AED`,
            collectedAmount: `${item?.totalAmount } AED`,
            progress: item?.targetAmount > 0 ? (item?.totalAmount / +item.targetAmount * 100).toFixed(2) : 0,
            image: '../../../../../../assets/images/thumb-img-1.png',
          }
        });
        console.log(res);
        // this._SpinnerService.hideSpinner();
      },
      error: (err)=>{
        this.campaigns= [
              {
                projectCampainNumber: "42",
                projectCampainDate: "13/11/2024",
                projectCampainName: "name ar",
                projectCampainDesc: "desc ar",
                targetAmount: 200,
                fndStatusLkpId: 11411,
                fndStatusLkp: {
                  nameEn: "مرحل",
                  nameAr: "مرحل",
                  lookupCode: "TmProjectCampain",
                  lookupType: "TmProjectCampainStatus",
                  yesNo: true,
                  creationTime: "2020-02-27T00:00:00",
                  id: 11411
                },
                tmProjectCampainTypeLkpId: 12449,
                tmProjectCampainType: {
                  nameEn: "Emergency case",
                  nameAr: "حالة طارئة",
                  lookupCode: "TmProjectCampain",
                  lookupType: "TmProjectCampainType",
                  yesNo: true,
                  creationTime: "2020-02-27T00:00:00",
                  id: 12449
                },
                projectCampainNameEn: "nameen",
                projectCampainDescEn: "desc en",
                postUserId: 7,
                postTime: "11/26/2024 1:27:53 PM",
                codeComUtilityTexts: "",
                isActive: true,
                tenantId: 1,
                visaAmount: 0,
                messageAmount: 0,
                totalAmount: 100,
                lastModificationTime: "2024-11-26T13:27:53.2966667",
                lastModifierUserId: 7,
                creationTime: "2024-11-26T09:27:46.7834541",
                id: 20071
              },
              {
                projectCampainNumber: "30",
                projectCampainDate: "22/02/2024",
                projectCampainName: "dfsdfsdf",
                projectCampainDesc: "dfsdfsd",
                targetAmount: 2323,
                fndStatusLkpId: 11411,
                fndStatusLkp: {
                  nameEn: "مرحل",
                  nameAr: "مرحل",
                  lookupCode: "TmProjectCampain",
                  lookupType: "TmProjectCampainStatus",
                  yesNo: true,
                  creationTime: "2020-02-27T00:00:00",
                  id: 11411
                },
                countryLkpId: 130,
                country: {
                  nameEn: "United Arab Emirates",
                  nameAr: "الإمارات العربية المتحدة",
                  lookupCode: "General",
                  lookupType: "Nationality",
                  yesNo: true,
                  addedValues: "SP_FND_NATIONALITY",
                  creationTime: "2020-01-01T00:00:00",
                  id: 130
                },
                postUserId: 7,
                postTime: "5/18/2024 10:38:42 AM",
                codeComUtilityTexts: "",
                arReceiptTypeId: 6,
                isActive: true,
                tenantId: 1,
                statusNumber: "233222323",
                visaAmount: 0,
                messageAmount: 0,
                totalAmount: 100,
                lastModificationTime: "2024-05-18T10:38:42.9533333",
                lastModifierUserId: 7,
                creationTime: "2024-02-08T05:40:55.2663962",
                id: 49
              }
            ].map(item=>{
              return {  
                id: 1,
                title: item?.projectCampainName,
                description: item?.projectCampainDesc,
                titleEn: item?.projectCampainNameEn,
                descriptionEn: item?.projectCampainDescEn,
                requiredAmount: '150,000 AED',
                collectedAmount: '75,000 AED',
                progress: item?.targetAmount > 0 ? (item?.totalAmount / +item.targetAmount * 100).toFixed(2) : 0,
                image: '../../../../../../assets/images/thumb-img-1.png',
              }
            })
        
        console.log(err);
      }
    })
}
  goDetails(id:any){
    this.router.navigate([`Main/Emergency/Details/${id}`]);
  }
}
