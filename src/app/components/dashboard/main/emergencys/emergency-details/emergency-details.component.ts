import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingService } from '../../servicesApi/landing.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../../../../../shared/services/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-emergency-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    TranslateModule
  ],
  templateUrl: './emergency-details.component.html',
  styleUrl: './emergency-details.component.scss',
  providers: [MessageService]
})
export class EmergencyDetailsComponent implements OnInit{
  emergencyItem:any;
  
  inputValue: number = 0;
  currentLang: string;
  constructor(
    private landingService:LandingService,
    private router:Router,
    private route:ActivatedRoute,
    private _SpinnerService: SpinnerService,
    private messageService: MessageService,
    private cartService: CartService,

    private translate: TranslateService
   ){
     this.currentLang = this.translate.currentLang || this.translate.defaultLang;

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      let id = params['emergencyId']; // Access visitId from the URL
      console.log("iidd = ",id,params);
      
      this.getEmergencyDetails(id);

    });
  }

  getEmergencyDetails(id:any){
    this._SpinnerService.showSpinner();
    this.landingService.getSingleEmergency(id).subscribe({
      next: (res)=>{
        this.emergencyItem = res.result[0];
        console.log(this.emergencyItem);
        
        this._SpinnerService.hideSpinner();
      }
    })
  };

  addToCartDonation(routing: boolean) {
    let cartItem:any;

      cartItem = {
                id: this.emergencyItem?.id,
                Image: this.emergencyItem?.imagePath,
                Name: this.emergencyItem?.projectCampainNameEn,
                Price: this.inputValue,
                Quantity: 1,
                Type: "Campaign",
                ProjectName: null,
                ProjectNotes: null,
                SponsorshipFrom: null,
                PaymentOption: null
            };
    // Retrieve existing items from localStorage
    let oldItems = JSON.parse(localStorage.getItem('items') || '[]');
  
    // Check if the item already exists
    let isItemFound = oldItems.some((existingItem: any) => existingItem.id === cartItem['id']);
  
    if (!isItemFound) {
        // Add the new item if it does not exist
        oldItems.push(cartItem);
        localStorage.setItem('items', JSON.stringify(oldItems));
        this.cartService.addToCart(cartItem);
        this.showSuccess();
        if (routing) {
          console.log("routing here to cart");
          this.router.navigate(['/Main/Cart']);
        }
    } else {
      this.handleFailure();
  
    }

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
