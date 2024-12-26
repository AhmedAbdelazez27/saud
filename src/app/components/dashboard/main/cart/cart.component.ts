import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router'; 
import { ToastModule } from 'primeng/toast';
import { DonationService } from '../servicesApi/donations.service';
import { CartService } from '../../../../shared/services/cart.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,ToastModule,RouterModule,TranslateModule],
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
    userId:'',
  };

  constructor(     private _DonationService: DonationService,
  private router: Router,private messageService: MessageService,private cartService: CartService
  ) {}
  ngOnInit(): void {
    const storedItems = localStorage.getItem('items');
    this.items = storedItems ? JSON.parse(storedItems) : [];
    console.log(this.items);
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
    this.totalSum = this.items.reduce(
      (sum, item) => sum + item.Price * item.Quantity,
      0
    );
  }
  removeItem(index: number): void {
    this.items.splice(index, 1); 
    localStorage.setItem('items', JSON.stringify(this.items)); 
    this.cartService.removeFromCart(this.items.length)
    this.calculateTotal(); 
  }
  logout() {
    localStorage.removeItem('userData');  
    sessionStorage.removeItem('userData');
  }
  onSubmit(): void {
    if (!this.formValues.dONATOR_NAME || !this.formValues.dONATOR_MOBILE) {
      console.log("Name and Phone fields are required");
      return; 
    }
    const orderInfoDetails = this.items.map(item => ({
      value: item.Quantity, 
      amount: item.Price ,
      Image : item.Image,
      Name: item.Name,
      PaymentOption: item.PaymentOption,
      ProjectName: item.ProjectName,
      ProjectNotes: item.ProjectNotes,
      SponsorshipFrom: item.SponsorshipFrom,
      SourceTypeName: item.Type,
      id :0,
      SourceId :item.id,
      TenantId :1

    }));
    const submissionData = {
      dONATOR_NAME: this.formValues.dONATOR_NAME,
      dONATOR_MOBILE: this.formValues.dONATOR_MOBILE,
      dONATOR_MAIL: this.formValues.dONATOR_MAIL,
      idNumber: this.formValues.idNumber,
      userId: this.formValues.userId,

      OrderInfoDetails: orderInfoDetails,  
    };
    console.log('Submitting:', submissionData);
    this._DonationService.Createportal(submissionData).subscribe({
      next: (data) => {
        console.log('Submission successful:', data);
        this.router.navigate(['/Main/Home']);
      },
      error: (error) => {
        console.error('Submission failed:', error);
      },
    });
  }
}
