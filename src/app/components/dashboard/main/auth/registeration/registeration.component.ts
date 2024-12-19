import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AboutusService } from '../../servicesApi/aboutus.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../../../../../shared/services/cart.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.scss',
  standalone: true,
  imports: [CommonModule,FormsModule, ToastModule,TranslateModule]  ,
  providers: [MessageService]

})
export class RegisterationComponent {
  formValues: any = { 
    BeneficentName: '',
    IdNumber: '',
    EmailAddress: '',
    MobileNumber1: '',
    UserName: '',
    Password: '', 
    ReEnterPassword :'',  
  };
  constructor( private _AboutusService:AboutusService ,private router: Router, private messageService : MessageService,private cartService: CartService ) {}
  
  OnRegisterlogin(): void {
    if (this.formValues.Password !== this.formValues.ReEnterPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Password does not match!'
      });
      return; 
    }
    if (!this.formValues.BeneficentName || !this.formValues.IdNumber || !this.formValues.EmailAddress || !this.formValues.MobileNumber1 || !this.formValues.UserName || !this.formValues.Password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill  the required data!'
      });
      return; 
    }
      const submissionData = {
      BeneficentName: this.formValues.BeneficentName,
      IdNumber: this.formValues.IdNumber,
      EmailAddress: this.formValues.EmailAddress,
      MobileNumber1: this.formValues.MobileNumber1,
      UserName: this.formValues.UserName,
      Password: this.formValues.Password,
    };
    console.log('Submitting:', submissionData);
      this._AboutusService.Registerlogin(submissionData).subscribe({
      next: (data) => {
        if (data.result && (data.result.message=== 'Failure')) { 
          this.handleFailure();
        } else {
          this.showSuccess();
          const userData = {
            userName: data.result.userName,
            userId: data.result.userId,
            IdNumber: data.result.idNumber,
            BeneficentName: data.result.beneficentName,
            MobileNumber1: data.result.mobileNumber1,
            EmailAddress: data.result.emailAddress
          };
          this.cartService.setUserName(userData); 
          this.router.navigate(['/Main/Home']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Registration is Failed.');
      }
    });
  }
  showSuccess() {  
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful' });
  };
  handleFailure(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Failed',
      detail: 'Registration is Failed ',
    });
  };
}
