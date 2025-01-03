import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ServicesService } from '../../servicesApi/services.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-food-inner',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,DialogModule,TranslateModule],
  templateUrl: './food-inner.component.html',
  styleUrl: './food-inner.component.scss'
})
export class FoodInnerComponent {
  preservingGraceForm: FormGroup;
  displayDialog: boolean = false;

  constructor(private fb: FormBuilder, private _ServicesService: ServicesService, private router:Router,private _SpinnerService:SpinnerService){

    this.preservingGraceForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      idNumber: ['', [Validators.required, Validators.maxLength(50)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      noOfPersons: [0, [Validators.required, Validators.min(1)]],
      reason: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.preservingGraceForm.valid) {
      this.displayDialog = true;
      this._SpinnerService.showSpinner();
      this._ServicesService.submitDonationFoods(this.preservingGraceForm.value).subscribe({
        next: (response: any) => {
          console.log('Request submitted successfully', response);
          this.preservingGraceForm.reset();
          this._SpinnerService.hideSpinner();
          this.displayDialog = true;
        },
        error: (error: any) => {
          console.error('Error submitting request', error);
          this._SpinnerService.hideSpinner();
        },
      });
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  onDialogOkClick() {
    this.displayDialog = false;
    this.router.navigate(['/Main/Home']);
  }

}
