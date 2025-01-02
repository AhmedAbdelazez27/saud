import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AboutusService } from '../servicesApi/aboutus.service';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule,DialogModule,FormsModule,ReactiveFormsModule,ToastModule,TranslateModule,ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  providers: [MessageService]
})
export class ContactUsComponent {

  contactMethods: any[] = [];
  requestTypes: any[] = [];
  selectedRequestType: number | null = null;
  contactForm: FormGroup;
  submitted = false;
  displayDialog: boolean=false;
  currentLang: string;


  constructor(private fb: FormBuilder,private aboutusService: AboutusService,private _SpinnerService:SpinnerService, private router:Router, private translate: TranslateService
  ){
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      requestTypeLkpId: [null, [Validators.required]],
      contactViaLkpId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchContactMethods();
    this.fetchRequestTypes();
  }

  fetchContactMethods(): void {
    this.aboutusService.getContactMethods( this.currentLang == 'ar' ? 'ar-EG':'en-US').subscribe({
      next: (response) => {
        this.contactMethods = response. result.results; // Adjust based on the API response structure
      },
      error: (error) => {
        console.error('Error fetching contact methods:', error);
      }
    });   
  }                                                     

  fetchRequestTypes(): void {
    this.aboutusService.getRequestTypes(this.currentLang == 'ar' ? 'ar-EG':'en-US').subscribe({
      next: (response) => {
        this.requestTypes = response.result.results; // Adjust based on API response structure
        if (this.requestTypes.length > 0) {
          this.contactForm.patchValue({ requestTypeLkpId: this.requestTypes[0].id });
        }
      },
      error: (error) => {
        console.error('Error fetching request types:', error);
      }
    });
  }

  selectRequestType(id: number): void {
    this.selectedRequestType = id;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.valid) {
      this._SpinnerService.showSpinner();
      const formData = this.contactForm.value;
      console.log('Form Data:', formData);

      this.aboutusService.contactusAdd({...formData,contactViaLkpId: +formData?.contactViaLkpId}).subscribe({
        next: (response) => {
          this.displayDialog = true;
          console.log('Contact request submitted successfully:', response);
          this._SpinnerService.hideSpinner();
        },
        error: (error) => {
          console.error('Error submitting contact request:', error);
          this._SpinnerService.hideSpinner();
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  onDialogOkClick() {
    this.displayDialog = false;
    this.router.navigate(['/Main/Home']);
  }
}
