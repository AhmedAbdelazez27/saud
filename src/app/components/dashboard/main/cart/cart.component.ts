// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PaymentCCAvenueComponent } from '../../../payment-ccavenue/payment-ccavenue.component';  // Import Payment Component
import { CartService } from '../../../../shared/services/cart.service';
import { DonationService } from '../servicesApi/donations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentService } from '../../../../shared/services/payment.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, RouterModule, PaymentCCAvenueComponent,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  items: any[] = [];
  totalSum: number = 0;
  formValues: any = { 
    dONATOR_NAME: '',
    idNumber: '',
    dONATOR_MAIL: '',
    dONATOR_MOBILE: '',
    userId: '',
  };

  // Pass payment data to PaymentCCAvenueComponent
  orderData = {
    amount: 0,          // To be calculated based on cart total
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    redirectUrl: 'http://localhost:4200/home',
    cancelUrl: 'http://localhost:4200/payment-cancel',
  };
  paymentData = {
    orderId: '', // Replace with dynamic order ID
    amount: 0,          // To be calculated based on cart total
  };
  isPaymentInProgress: boolean = false;
  paymentUrl: SafeResourceUrl = ''; // SafeResourceUrl for sanitization
  falgeAbleBtn: boolean = true;


  constructor(
    private _DonationService: DonationService,
    private router: Router,
    private messageService: MessageService,
    private _SpinnerService: SpinnerService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const storedItems = localStorage.getItem('items');
    this.items = storedItems ? JSON.parse(storedItems) : [];
    this.calculateTotal();
    this.cartService.userData$.subscribe((userData) => {
      if (userData) {
        this.formValues.dONATOR_NAME = userData.BeneficentName || '';
        this.formValues.idNumber = userData.IdNumber || '';
        this.formValues.dONATOR_MAIL = userData.EmailAddress || '';
        this.formValues.dONATOR_MOBILE = userData.MobileNumber1 || '';
        this.formValues.userId = userData.userId || '';
      }
    });
  }

  calculateTotal(): void {
    this.totalSum = this.items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);

    // Assign the total sum to the payment data object
    this.orderData.amount = this.totalSum;
    this.orderData.customerName = this.formValues.dONATOR_NAME;
    this.orderData.customerEmail = this.formValues.dONATOR_MAIL;
    this.orderData.customerPhone = this.formValues.dONATOR_MOBILE;
  }

  removeItem(index: number): void {
    this.items.splice(index, 1); 
    localStorage.setItem('items', JSON.stringify(this.items)); 
    this.cartService.removeFromCart(this.items.length);
    this.calculateTotal();
  }

  onSubmit(): void {
    if (!this.formValues.dONATOR_NAME || !this.formValues.dONATOR_MOBILE) {
      this.messageService.add({
        severity: 'error',
        summary: "Please fill in your information",
        detail: ""
      });
      return; 
    }
    this.falgeAbleBtn = false;
    this._SpinnerService.showSpinner();
    // Create order info for backend submission
    const orderInfoDetails = this.items.map(item => ({
      value: item.Quantity, 
      amount: item.Price,
      Image: item.Image,
      Name: item.Name,
      PaymentOption: item.PaymentOption,
      ProjectName: item.ProjectName,
      ProjectNotes: item.ProjectNotes,
      SponsorshipFrom: item.SponsorshipFrom,
      SourceTypeName: item.Type,
      id: 0,
      SourceId: item.id,
      TenantId: 1
    }));

    const submissionData = {
      dONATOR_NAME: this.formValues.dONATOR_NAME,
      dONATOR_MOBILE: this.formValues.dONATOR_MOBILE,
      dONATOR_MAIL: this.formValues.dONATOR_MAIL,
      idNumber: this.formValues.idNumber,
      userId: this.formValues.userId,
      OrderInfoDetails: orderInfoDetails,
    };

    this._DonationService.Createportal(submissionData).subscribe({
      next: (data) => {
        console.log('Submission successful:', data);
        // this.router.navigate(['/Main/Home']);
        // calling for payment 
        this.onSubmitPayment({amount:this.orderData.amount,orderId:data.result?.id})
        
      },
      error: (error) => {
        console.error('Submission failed:', error);
        this._SpinnerService.hideSpinner();

      },
    });
  }

  // ***************************** handle payment **********************
    onSubmitPayment(dataPaymentFinal:any) {
      this.isPaymentInProgress = true;
    
      // Call PaymentService to create the payment session (using the static URL for now)
      this.paymentService.createPaymentSession(dataPaymentFinal).subscribe(
        (response: any) => {
          if (response.success && response.result) {
            const staticUrl =   response.result.url// Use static URL method
            console.log("Static URL: ", staticUrl);  // Log the static URL
            this.paymentUrl = this.sanitizeUrl(staticUrl); // Sanitize the static URL
    
            // Extract the URL as a string from SafeResourceUrl
            const paymentLink: string = (this.paymentUrl as any).changingThisBreaksApplicationSecurity;
    
            // Log the final payment link for debugging
            console.log("Final payment link: ", paymentLink);
    
            // Open the static payment URL in a new tab
            window.open(paymentLink, '_self');
          } else {
            alert('Failed to create payment session');
            this.isPaymentInProgress = false;
          }
          this._SpinnerService.hideSpinner();
        },
        (error) => {
          alert('Error occurred during payment session creation');
          this.isPaymentInProgress = false;
          this._SpinnerService.hideSpinner();
        }
      );
    }
    
  
    /**
     * Method to return the static payment URL.
     * This will use the static URL provided by the backend.
     */
    private getStaticPaymentUrl(accessCode:any,encRequest:any): string {
      return `https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction&encRequest=${encRequest}&access_code=${accessCode}`;
      // Static URL provided by the backend
      // return `https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction&encRequest=d335730a689df81dc589fda960f57627ab0e02262a8830c3fe15f50d70c9a94ac6fc992799bdceac578c6f839578a51f23a1b9c69120b5eeea28ddb8e7554360e83a34b391e1defa05ff69df2f84192f7fead3a9f2d8e7715124d30ba8ed37738320e579da2db6ce8127bcaaa75b0a0da0597bc4816332bc7b986985b690ea308ca52aa9f84fe04b2291091b7b0ee188af2d51d9eee4fce11ca84d566adca33129df3cdf0442fe63846c43972f2ee40c&access_code=AVZW05MD32AP40WZPA`;
    }
  
    /**
     * Sanitize the URL to mark it as safe for use in the iframe src.
     */
    private sanitizeUrl(url: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
