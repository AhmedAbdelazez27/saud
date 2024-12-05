import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ServicesService } from '../../servicesApi/services.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';


@Component({
  selector: 'app-ambulance-inner',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,DialogModule],
  templateUrl: './ambulance-inner.component.html',
  styleUrl: './ambulance-inner.component.scss'
})
export class AmbulanceInnerComponent {
  displayDialog: boolean =false;
  ambulanceForm: FormGroup;
  drivers: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private _ServicesService: ServicesService,
    private router:Router,
    private _SpinnerService:SpinnerService,
    ){
      this.ambulanceForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.maxLength(200)]],
        idNumber: ['', [Validators.required, Validators.maxLength(50)]],
        mobileNumber: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        reservationDate: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(4000)]],
        isApprove: [false, Validators.requiredTrue],
        filePath: ['', Validators.required],
        notes: [''],
        websitedriverId: ['', Validators.required],
        plateNumber: ['', [Validators.required, Validators.maxLength(200)]],
      });
    };

    ngOnInit(): void {
      this.loadDrivers();
    }
  
    loadDrivers(): void {
      this._ServicesService.getDrivers().subscribe({
        next: (response) => {
          this.drivers = response.result.results;
        },
        error: (error) => console.error('Error loading drivers:', error),
      });
    }
  
    onFileSelect(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this._ServicesService.uploadFile(file).subscribe({
          next: (response) => {
            console.log('File uploaded successfully:', response);
            this.ambulanceForm.patchValue({ filePath: response.result });
          },
          error: (error) => console.error('Error uploading file:', error),
        });
      }
    }
  
    onSubmit(): void {
      const finalData = {
        ...this.ambulanceForm.value ,
        reservationDate : this.formatDate(this.ambulanceForm.value?.reservationDate)
      };
      console.log(finalData);
      
      if (this.ambulanceForm.valid) {
        this._SpinnerService.showSpinner();
        this._ServicesService.createAmbulanceRequest(finalData).subscribe({
          next: (response) => {
            console.log('Ambulance request submitted successfully:', response);
            this._SpinnerService.hideSpinner();
            this.displayDialog = true;
            this.ambulanceForm.reset();
          },
          error: (error) => console.error('Error submitting ambulance request:', error),
        });
      }
    }

    formatDate(inputDate: any): string {
      if (typeof inputDate !== 'string' || !inputDate) return '';
  
      const [year, month, day] = inputDate.split('-');
      return `${day}/${month}/${year}`;
    }
    onDialogOkClick() {
      this.displayDialog = false;
      this.router.navigate(['/Main/Home']);
    }

}