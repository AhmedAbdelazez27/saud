import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ServicesService } from '../../servicesApi/services.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';


@Component({
  selector: 'app-transport-inner',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,DialogModule],
  templateUrl: './transport-inner.component.html',
  styleUrl: './transport-inner.component.scss'
})
export class TransportInnerComponent implements OnInit {
  transportForm: FormGroup;
  universities: any[] = [];
  drivers: any[] = [];
  selectedFile: File | null = null;
  displayDialog: boolean =false;

  constructor(
    private fb: FormBuilder,
    private _ServicesService: ServicesService,
    private router:Router,
    private _SpinnerService:SpinnerService,
    ){
      this.transportForm = this.fb.group({
        guardianName: ['', [Validators.required, Validators.maxLength(200)]],
        idNumber: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: ['', [Validators.required, Validators.maxLength(50)]],
        fullName: ['', [Validators.required, Validators.maxLength(200)]],
        universityLkpId: ['', Validators.required],
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required],
        websitedriverId: ['', Validators.required],
        isApprove: [false, Validators.requiredTrue],
        filePath: ['', Validators.required],
        notes: [''],
      });
    }

    ngOnInit(): void {
      this.loadUniversities();
      this.loadDrivers();
    }
  
    loadUniversities(): void {
      this._ServicesService.getUniversities().subscribe({
        next: (response) => {
          this.universities = response.result.results;
        },
        error: (error) => console.error('Error loading universities:', error),
      });
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
            this.transportForm.patchValue({ filePath: response.result});
          },
          error: (error) => console.error('Error uploading file:', error),
        });
      }
    }
  
    onSubmit(): void {
      if (this.transportForm.valid) {
        this._SpinnerService.showSpinner();
        const finalData = {
          ...this.transportForm.value,
          fromDate : this.formatDate(this.transportForm.value?.fromDate),
          toDate : this.formatDate(this.transportForm.value?.toDate)
        }
        this._ServicesService.createTransportRequest(finalData).subscribe({
          next: (response) => {
            console.log('Transport request submitted successfully:', response);
            this._SpinnerService.hideSpinner();
            this.displayDialog = true;
            this.transportForm.reset();
          },
          error: (error) => {
            console.error('Error submitting request:', error)
            this._SpinnerService.hideSpinner();
          },
        });
      }
    };

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