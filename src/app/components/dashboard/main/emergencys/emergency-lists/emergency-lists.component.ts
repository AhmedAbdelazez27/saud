import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingService } from '../../servicesApi/landing.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-emergency-lists',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule
  ],
  templateUrl: './emergency-lists.component.html',
  styleUrl: './emergency-lists.component.scss',
  providers: [MessageService]
})
export class EmergencyListsComponent implements OnInit{
  campaigns: any[] = [];
  constructor(
    private router:Router,
    private landingService: LandingService,
    private messageService: MessageService
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
        
        this.campaigns= res.result.map((item: {
          id: any; projectCampainName: any; projectCampainDesc: any; projectCampainNameEn: any; projectCampainDescEn: any; targetAmount: number; totalAmount: number; 
})=>{
          return {  
            ...item,
            id: item?.id,
            title: item?.projectCampainName,
            description: item?.projectCampainDesc,
            titleEn: item?.projectCampainNameEn,
            descriptionEn: item?.projectCampainDescEn,
            requiredAmount: `${item?.targetAmount } AED`,
            collectedAmount: `${item?.totalAmount } AED`,
            progress: item?.targetAmount > 0 ? (item?.totalAmount / +item.targetAmount * 100).toFixed(2) : 0,
            filePath: '../../../../../../assets/images/thumb-img-1.png',
          }
        });
        console.log(res);
        // this._SpinnerService.hideSpinner();
      },
      error: (err)=>{
        console.log(err);
      }
    })
}
  goDetails(id:any){
    this.router.navigate([`Main/Emergency/Details/${id}`]);
  }

  addToCart(item: any) {
    console.log(item);

    // let cartItem: { [key: string]: any } = {
    //     id: item['id'],
    //     Image: "https://erp.fujcharity.ae/ERPAttachments/AppAttachments/HrPerson-Profile/HrPerson-Profile-13215342-c615-4b0c-b3e8-428fccf7017a.jpg",
    //     Name: item['projectCampainName'],
    //     Price: item['targetAmount'],
    //     Quantity: 1,
    //     Type: item?.tmProjectCampainType?.nameEn,
    //     ProjectName: null,
    //     ProjectNotes: null,
    //     SponsorshipFrom: null,
    //     PaymentOption: null
    // };

    // // Retrieve existing items from localStorage
    // let oldItems = JSON.parse(localStorage.getItem('items') || '[]');

    // // Check if the item already exists
    // let isItemFound = oldItems.some((existingItem: any) => existingItem.id === cartItem['id']);

    // if (!isItemFound) {
    //     // Add the new item if it does not exist
    //     oldItems.push(cartItem);
    //     localStorage.setItem('items', JSON.stringify(oldItems));
    //     console.log('Item added to cart:', cartItem);
    //     this.showSuccess();
    // } else {
    //   this.handleFailure();
    //     console.log('Item already exists in the cart:', cartItem);

    // }
}
showSuccess() {
  console.log("toaster");
  
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added to Cart Successfully' });
}

// On Failure
handleFailure(): void {
  this.messageService.add({
    severity: 'error',
    summary: 'Failed',
    detail: 'Failed to Add to Cart',
  });
};

}
