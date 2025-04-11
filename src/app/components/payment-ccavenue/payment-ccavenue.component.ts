
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// @Component({
//   selector: 'app-payment-ccavenue',
//   standalone:true,
//   templateUrl: './payment-ccavenue.component.html',
//   styleUrl: './payment-ccavenue.component.scss'
// })
// export class PaymentCCAvenueComponent implements OnInit {
//   @ViewChild('paymentFormRef', { static: true }) paymentForm!: ElementRef<HTMLFormElement>;


//   checkoutUrl = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';
//   encryptionRequest = '';
//   accessCode = '';
//   ngForm:any;
//   ngOnInit(): void {
//     // Simulate fetching from backend (you can use HttpClient here)
//     this.encryptionRequest = '099453330E7C2E151F87FCAC64E762CA';
//     this.accessCode = 'AVZW05MD32AP40WZPA';

//     // Delay to ensure form renders, then auto-submit
//     setTimeout(() => {
//       this.paymentForm.nativeElement.submit();
//     }, 100);
//   }
// }

// import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
//  import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-payment-ccavenue',
//   standalone:true,
//   imports:[CommonModule],
//   templateUrl: './payment-ccavenue.component.html',
//    styleUrl: './payment-ccavenue.component.scss'
// })
// export class PaymentCCAvenueComponent implements OnInit {
//    @ViewChild('paymentFormRef', { static: true }) paymentForm!: ElementRef<HTMLFormElement>;

//   checkoutUrl = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';
//    encryptionRequest = '';
//    accessCode = '';
//   ngForm:any;
//   isLoaded=false;

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     // Create payment request
//     const paymentDto = {
//       orderId: 'ORD1001',
//       amount: 499.99,
//       redirectUrl: 'http://localhost:21021/home', // Change this to your actual redirect URL
//       cancelUrl: 'http://localhost:21021/payment-cancel', // Change this to your actual cancel URL
//       customerName: 'John Doe', 
//       customerEmail: 'john@doe.com',
//       customerPhone: '9999999999'
//     };

//     console.log("oninit payment component");
    
//     // Make a request to backend to get the encrypted payment details
//     this.http.post<any>('http://compassint.ddns.net:2036/api/payment/request', paymentDto).subscribe(response => {
//       console.log("response come from backend ",response);
      
//       this.encryptionRequest = response.encryptionRequest;
//       this.accessCode = response.accessCode;
//       // this.isLoaded=true;
//       console.log(this.encryptionRequest);
//       // Automatically submit the form after receiving encRequest and accessCode
//       // setTimeout(() => {
//       //   this.submitPaymentForm();
//       // }, 200);
    
//     });
//   }

//   submitPaymentForm(): void {
//     // Create a form with encRequest and accessCode
//     const form = document.createElement('form');
//     form.method = 'POST';
//     form.action = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

//     const encRequestField = document.createElement('input');
//     encRequestField.type = 'hidden';
//     encRequestField.name = 'encryptionRequest';
//     encRequestField.value = this.encryptionRequest;
//     console.log(this.encryptionRequest);
//     const accessCodeField = document.createElement('input');
//     accessCodeField.type = 'hidden';
//     accessCodeField.name = 'access_code';
//     accessCodeField.value = this.accessCode;

//     form.appendChild(encRequestField);
//     form.appendChild(accessCodeField);

//     document.body.appendChild(form);

//     // Submit the form to CCAvenue
//     form.submit();
//   }
// }


// src/app/components/payment/payment.component.ts

import { Component, Input, Signal } from '@angular/core';
import { PaymentService } from '../../shared/services/payment.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-ccavenue',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './payment-ccavenue.component.html',
   styleUrl: './payment-ccavenue.component.scss'
})
export class PaymentCCAvenueComponent {
  @Input() paymentData: any;

  isPaymentInProgress: boolean = false;
  paymentUrl: SafeResourceUrl = ''; // SafeResourceUrl for sanitization

  constructor(private paymentService: PaymentService, private sanitizer: DomSanitizer) {
    console.log( window.location.hostname);
  }

  /**
   * This method is called when the user submits the payment form.
   */
  onSubmitPayment() {
    this.isPaymentInProgress = true;
  
    // Call PaymentService to create the payment session (using the static URL for now)
    this.paymentService.createPaymentSession(this.paymentData).subscribe(
      (response: any) => {
        if (response.success && response.result) {
          const staticUrl = this.getStaticPaymentUrl(response.result.accessCode,response.result.encRequest); // Use static URL method
          console.log("Static URL: ", staticUrl);  // Log the static URL
          this.paymentUrl = this.sanitizeUrl(staticUrl); // Sanitize the static URL
  
          // Extract the URL as a string from SafeResourceUrl
          const paymentLink: string = (this.paymentUrl as any).changingThisBreaksApplicationSecurity;
  
          // Log the final payment link for debugging
          console.log("Final payment link: ", paymentLink);
  
          // Open the static payment URL in a new tab
          window.open(paymentLink, '_blank');
        } else {
          alert('Failed to create payment session');
          this.isPaymentInProgress = false;
        }
      },
      (error) => {
        alert('Error occurred during payment session creation');
        this.isPaymentInProgress = false;
      }
    );
  }
  

  /**
   * Method to return the static payment URL.
   * This will use the static URL provided by the backend.
   */
  private getStaticPaymentUrl(accessCode:any,encRequest:any): string {
    // return `https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction&encRequest=${encRequest}&access_code=${accessCode}`;
    // Static URL provided by the backend
    return `https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction&encRequest=d335730a689df81dc589fda960f57627ab0e02262a8830c3fe15f50d70c9a94ac6fc992799bdceac578c6f839578a51f23a1b9c69120b5eeea28ddb8e7554360e83a34b391e1defa05ff69df2f84192f7fead3a9f2d8e7715124d30ba8ed37738320e579da2db6ce8127bcaaa75b0a0da0597bc4816332bc7b986985b690ea308ca52aa9f84fe04b2291091b7b0ee188af2d51d9eee4fce11ca84d566adca33129df3cdf0442fe63846c43972f2ee40c&access_code=AVZW05MD32AP40WZPA`;
  }

  /**
   * Sanitize the URL to mark it as safe for use in the iframe src.
   */
  private sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
// return `https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction&encRequest=d335730a689df81dc589fda960f57627ab0e02262a8830c3fe15f50d70c9a94ac6fc992799bdceac578c6f839578a51f23a1b9c69120b5eeea28ddb8e7554360e83a34b391e1defa05ff69df2f84192f7fead3a9f2d8e7715124d30ba8ed37738320e579da2db6ce8127bcaaa75b0a0da0597bc4816332bc7b986985b690ea308ca52aa9f84fe04b2291091b7b0ee188af2d51d9eee4fce11ca84d566adca33129df3cdf0442fe63846c43972f2ee40c&access_code=AVZW05MD32AP40WZPA`
// https://secure.ccavenue.ae/transaction/transaction.do?access_code=AVZW05MD32AP40WZPA&enc_request=36512b629bba346a25a0ebb567dee322fd6610bc2b3bdb2e85b1128d87513f79827579eb518f84a97b1c4ea728b52edc5e31ae9d1ca80e0924018f98b4750d6c3deee3371a94e16d1e89b0b21925e7ec909b97c6c725226a7f36addf4022414b2e4765417c2830b7b566ce2f15f5010e5a139efa07f85304406a7179404bddb7ae750f8c99bc4d185263ba57564cf6b97af8a3284c3456260f8a321ffec4fe3e9a25c6ced2911c2b1d85fa7f8faee6caf6f253e54cf8fe45b2b228eb705e7a155fb25dea15c48179c41fb62852d15c80465275a52ee0b699ce4324557271befad74f64572a6b6a8915cd6c36e211e560
