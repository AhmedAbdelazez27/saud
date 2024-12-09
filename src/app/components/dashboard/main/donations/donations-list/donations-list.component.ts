import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../servicesApi/donations.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-donations-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ToastModule],
  templateUrl: './donations-list.component.html',
  styleUrl: './donations-list.component.scss',
  providers : [MessageService]
})
export class DonationsListComponent implements OnInit {
  selectedTab: string = 'general'; // Default tab
  itemsWithNonEmptySMSTr: any[]=[];
  allItems: any;
  listDonation:any[]=[];
  currentItemCart : any;
  inputValue: number=0;
  
  constructor(
    private _DonationService: DonationService,
    private messageService: MessageService,
    private router:Router,
    private _SpinnerService: SpinnerService,
  ) {

  }
  ngOnInit(): void {
    this.gttingDonations();
  }
  // Method to switch tabs
  switchTab(tab: string): void {
    this.selectedTab = tab;
    if (tab == 'general') {
      this.listDonation = JSON.parse(JSON.stringify(this.allItems));
    } else {
      this.listDonation = JSON.parse(JSON.stringify(this.itemsWithNonEmptySMSTr));
    }
  }
  results:any;
  selectCurrentItem(e:Event,item:any,isRouting:boolean,typeV?:string){

    e.stopPropagation();
    this.results = [];
    console.log(item);
    if (item?.tmAutoCouponSMSTr &&  item?.tmAutoCouponSMSTr.length>0   ) {
      for (let i = 0; i < item?.tmAutoCouponSMSTr.length; i += 3) {
        this.results.push(item?.tmAutoCouponSMSTr.slice(i, i + 3));
      }
    }
    this.currentItemCart = {...item,isRouting,typeV}
  }

  gttingDonations() {
    this._SpinnerService.showSpinner();
    this._DonationService.getDonations().subscribe({
      next: (data) => {

        // Extract all items
        this.allItems = data.result;
        this.listDonation = JSON.parse(JSON.stringify(this.allItems));
        // Extract items where `tmAutoCouponSMSTr` is not empty
        this.itemsWithNonEmptySMSTr = data.result.filter(
          (item: { tmAutoCouponSMSTr: string | any[]; }) => item.tmAutoCouponSMSTr && item.tmAutoCouponSMSTr.length > 0
        );
        this._SpinnerService.hideSpinner();

      },
      error : (err)=>{
        this._SpinnerService.hideSpinner();
      }
    })
  };

  addToCartDonation(item: any) {
    console.log(item);
    let cartItem:any;
      
      cartItem = {
          id: item['id'],
          Image: item.filePath,
          Name: item.autoCouponName,
          Price: this.inputValue,
          Quantity: 1,
          Type: item?.typeV,
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
        this.showSuccess();
        if (this.currentItemCart.isRouting) {
          console.log("routing here to cart");
          this.router.navigate(['/Main/Cart']);
        }
    } else {
      this.handleFailure();
  
    }
    this.inputValue = 0;
  };

  showSuccess() {  
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added to Cart Successfully' });
  };
  // On Failure
  handleFailure(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Failed',
      detail: 'Item already exists in the cart',
    });
  };
}
