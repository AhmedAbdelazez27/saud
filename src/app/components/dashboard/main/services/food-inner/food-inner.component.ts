import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ServicesService } from '../../servicesApi/services.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HallReservationService } from '../../servicesApi/hall-reservation.service';

@Component({
  selector: 'app-food-inner',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule, TranslateModule],
  templateUrl: './food-inner.component.html',
  styleUrl: './food-inner.component.scss'
})
export class FoodInnerComponent implements OnInit {
  preservingGraceForm: FormGroup;
  displayDialog: boolean = false;
  currentLang: string;
  typeOfEventOptions: any[] = [];
  fileFailed?: boolean;
  selectedFileName: any;

  constructor(private fb: FormBuilder, private _ServicesService: ServicesService, private router: Router, private _SpinnerService: SpinnerService, private translate: TranslateService, private hallReservationService: HallReservationService
  ) {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;

    this.preservingGraceForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      idNumber: ['', [Validators.required, Validators.maxLength(50)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(400)]],
      cityLkpId: ['', Validators.required],
      reason: ['', [Validators.required]],
      filePath: [''],
    });
  }
  ngOnInit(): void {
    this.fetchTypeOfEventOptions();
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
  // Fetch TypeOfEvent options
  fetchTypeOfEventOptions() {
    this.hallReservationService.getOtherOptions(this.currentLang == 'ar' ? 'ar-EG' : 'en-US', 'city').subscribe((response) => {
      this.typeOfEventOptions = response.result.results;
    });
  }

  /**
 * Handle File Selection
 */
  onFileSelect(event: any, type?: string): void {
    const file = event.target.files[0];
    if (file) {
      this._ServicesService.uploadFileVolunteerDetails(file).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          this.selectedFileName = file.name;
          this.preservingGraceForm.patchValue({
            filePath: file.name, // Assuming API returns `filePath`
          });

        },
        error: (error) => {
          this.fileFailed = true;
          console.error('Error uploading file:', error)
        },
      });
    }
  }

}
