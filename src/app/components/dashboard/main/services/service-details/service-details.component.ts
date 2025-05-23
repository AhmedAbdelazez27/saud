import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../servicesApi/services.service';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HallReservationService } from '../../servicesApi/hall-reservation.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,DialogModule,TranslateModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent {
  donationForm: FormGroup;
  displayDialog: boolean = false;
  typeOfEventOptions: any[] = [];
  currentLang: string;

  constructor(private fb: FormBuilder, private _ServicesService: ServicesService, private router:Router,private _SpinnerService:SpinnerService, private hallReservationService :HallReservationService, private translate: TranslateService
      ) {
        this.currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.donationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      idNumber: ['', [Validators.required, Validators.maxLength(50)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(400)]],
      cityLkpId: ['', Validators.required],
      notes: [''],
    });
    this.fetchTypeOfEventOptions();
  };

  onSubmit(): void {
    if (this.donationForm.valid) {
      this._SpinnerService.showSpinner();
      this._ServicesService.submitDonationClothes(this.donationForm.value).subscribe({
        next: (response: any) => {
          this.donationForm.reset();
          console.log('Request submitted successfully', response);
          this._SpinnerService.hideSpinner();
          this.displayDialog = true;

        },
        error: (error: any) => {
          console.error('Error submitting request', error);
          this._SpinnerService.hideSpinner();
        },
      });
    }else {
      alert('Please fill all required fields correctly.');
    }
  };

  onDialogOkClick() {
    this.displayDialog = false;
    this.router.navigate(['/Main/Home']);
  }
  // Fetch TypeOfEvent options
  fetchTypeOfEventOptions() {
    this.hallReservationService.getOtherOptions(this.currentLang == 'ar' ? 'ar-EG':'en-US', 'city').subscribe((response) => {
      this.typeOfEventOptions = response.result.results;
    });
  }
}
