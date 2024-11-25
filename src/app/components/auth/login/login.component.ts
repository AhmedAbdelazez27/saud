import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { SpinnerService } from '../../../shared/services/spinner.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AuthService], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // loginForm!: FormGroup;
  // userLogin?: UserLogIn;
  // authUser?: User;
  // roles_urls?: Object;
  // user_types?: UserType[];
  @Output() goToForgotPasswordPageEE = new EventEmitter();

  constructor(
    private router: Router,
     private userService: AuthService,
     private _SpinnerService: SpinnerService
    ) {}

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   userName: new FormControl(null,[Validators.required]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    // });
  }

  // Login(): void {
  //   this._SpinnerService.showSpinner();
  //   this.userLogin = this.loginForm?.value;
  //   this.userService.logIn(this.userLogin).subscribe({
  //     next: (res: any) => {
  //       console.log('Token: ' + res.data?.token);
  //       console.log('USER INFO: ' + res);
  //       localStorage.setItem("token", res.data?.token)
  //       localStorage.setItem('userInfo',JSON.stringify({userName:res.data?.userName,userType:res?.data?.userType}))
  //       // this.userService.saveUserDataInLocalStorage(res.data?.token);
  //       this.router.navigate(['/Main']);
  //       this._SpinnerService.hideSpinner();
  //     },
  //     error: (err) => {
  //       console.error('Login error:', err);
  //       this._SpinnerService.hideSpinner();
  //     }
  //   });
  // }

  // goToForgotPage(): void {
  //   this.router.navigateByUrl('/forget-password');
  // }
}
