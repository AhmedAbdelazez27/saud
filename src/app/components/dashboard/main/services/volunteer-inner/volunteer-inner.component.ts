import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ServicesService } from '../../servicesApi/services.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';

@Component({
  selector: 'app-volunteer-inner',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,DialogModule],
  templateUrl: './volunteer-inner.component.html',
  styleUrl: './volunteer-inner.component.scss'
})
export class VolunteerInnerComponent implements OnInit {
  displayDialog: boolean = false;
  volunteerForm: FormGroup;
  volunteerTypes: any[] = [];
  universities: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private _ServicesService: ServicesService,
    private router:Router,
    private _SpinnerService:SpinnerService,
    ){

    this.volunteerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      idNumber: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(50)]],
      typeOfVolunteerWorkLkpId: ['', Validators.required],
      universityLkpId: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      workingHours: [0, [Validators.required, Validators.min(1)]],
      universitycardFilePath: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadVolunteerTypes();
    this.loadUniversities();
  }
  /**
   * Load Volunteer Types
   */
  loadVolunteerTypes(): void {
    this._ServicesService.getVolunteerTypes().subscribe({
      next: (response) => {
        this.volunteerTypes = response.result.results;
      },
      error: (error) => {
        console.error('Error fetching volunteer types:', error);
      },
    });
  }

  /**
   * Load Universities
   */
  loadUniversities(): void {
    this._ServicesService.getUniversities().subscribe({
      next: (response) => {
        this.universities = response.result.results;
      },
      error: (error) => {
        console.error('Error fetching universities:', error);
      },
    });
  };

    /**
   * Handle File Selection
   */
    onFileSelect(event: any): void {
      const file = event.target.files[0];
      this.selectedFile = file;
  
      if (this.selectedFile) {
        console.log(this.selectedFile);
        
        this.volunteerForm.patchValue({
                universitycardFilePath: this.selectedFile.name, // Assuming API returns `filePath`
              });
        // Upload file to the server
        // this.volunteerRequestService.uploadFile(this.selectedFile).subscribe({
        //   next: (response) => {
        //     console.log('File uploaded successfully:', response);
        //     this.volunteerForm.patchValue({
        //       universitycardFilePath: response.result.filePath, // Assuming API returns `filePath`
        //     });
        //   },
        //   error: (error) => {
        //     console.error('Error uploading file:', error);
        //   },
        // });
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
  /**
   * Submit the Form
   */
  onSubmit(): void {
    if (this.volunteerForm.valid) {
      this._SpinnerService.showSpinner();
      const finalData = {
        ...this.volunteerForm.value,
        fromDate : this.formatDate(this.volunteerForm.value?.fromDate),
        toDate : this.formatDate(this.volunteerForm.value?.toDate)
      }
      this._ServicesService
        .submitVolunteerRequest(finalData)
        .subscribe({
          next: (response) => {
            console.log('Volunteer request submitted successfully:', response);
            this.displayDialog = true;
            this._SpinnerService.hideSpinner();
            this.volunteerForm.reset();
          },
          error: (error) => {
            console.error('Error submitting volunteer request:', error);
            this._SpinnerService.hideSpinner();
          },
        });
    }
  }

}