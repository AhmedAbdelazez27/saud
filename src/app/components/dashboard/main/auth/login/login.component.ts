import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { AboutusService } from '../../servicesApi/aboutus.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../../../../../shared/services/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule, ToastModule]  ,
  providers: [MessageService]

})
export class LoginComponent {
  formValues: any = { 
    UserName: '',
    Password: '',
  };
  constructor( private _AboutusService:AboutusService ,private router: Router, private messageService : MessageService,private cartService: CartService ) {}
  onclickregister(): void {
    this.router.navigate(['/Main/Auth/Register']);
  }

  Onlogin(): void {
    if (!this.formValues.UserName || !this.formValues.Password) {
      console.log("UserName and Password are required");
      return; 
    }
      const submissionData = {
      UserName: this.formValues.UserName,
      Password: this.formValues.Password
    };
    console.log('Submitting:', submissionData);
      this._AboutusService.login(submissionData).subscribe({
      next: (data) => {
        if (data.result && (data.result.userId === null || data.result.userId === 0)) {
          this.handleFailure();
        } else {
          this.showSuccess();  
          const userData = {
            userName: data.result.userName,
            IdNumber: data.result.idNumber,
            userId: data.result.userId,
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
        alert('Login failed. Please check your username and password.');
      }
    });
  }
  showSuccess() {  
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
  };
  handleFailure(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Failed',
      detail: 'Username Or Password incorrect',
    });
  };
}
