import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../servicesApi/landing.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HallReservationService } from '../../servicesApi/hall-reservation.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-councils-hall-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,DialogModule],
  templateUrl: './councils-hall-details.component.html',
  styleUrl: './councils-hall-details.component.scss'
})
export class CouncilsHallDetailsComponent implements OnInit{
  currentItem:any;
  reservationForm: FormGroup;
  typeOfEventOptions: any[] = [];
  otherOptions: any[] = [];
  displayDialog: boolean = false;

  constructor(
    private landingService: LandingService,
    private _SpinnerService: SpinnerService,
    private route:ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private _HallReservationService:HallReservationService
  ){
    this.reservationForm = this.fb.group({
      // websiteHallsCouncilId: [null, Validators.required],
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      idNumber: ['', [Validators.required, Validators.maxLength(50)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      typeOfEventLkpId: [null, Validators.required],
      numberOfInvitees: [null, [Validators.required, Validators.min(1)]],
      otherOptionsLkpId: [null],
      notes: ['', Validators.maxLength(4000)],
      eventDate: [null, Validators.required]
    });

    this.loadLookupData();

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      let id = params['councilId']; // Access visitId from the URL
      console.log("iidd = ",id,params);
      
      this.gettingSingleHallCouncil(id);

    });
  }

  gettingSingleHallCouncil(id:any){
    this._SpinnerService.showSpinner();
    this.landingService.getSingleHallCouncils(id).subscribe({
      next: (res)=>{
        console.log(res.result);
        this.currentItem = res.result;
        console.log("currentItem = ",this.currentItem);
        
        this._SpinnerService.hideSpinner();
      }
    })
  };

  private loadLookupData(): void {
    this._HallReservationService.getTypeOfEventLookup().subscribe(
      (data) => {
        this.typeOfEventOptions = data.result.results;
        console.log("dd ",data.result.results);
        
      },
      (error) => {
        console.error('Error loading TypeOfEvent lookup', error);
      }
    );

    this._HallReservationService.getOtherOptionsLookup().subscribe(
      (data) => {
        this.otherOptions = data.result.results;
        console.log("data.result.results ",data.result.results,'dd',data);
        
      },
      (error) => {
        console.error('Error loading OtherOptions lookup', error);
      }
    );
  };

  formatDate(inputDate: any): string {
    if (typeof inputDate !== 'string' || !inputDate) return '';

    const [year, month, day] = inputDate.split('-');
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const finalData = {
        ...this.reservationForm.value,
        eventDate : this.formatDate(this.reservationForm.value?.eventDate),
        websiteHallsCouncilId : this.currentItem?.id
      }
      this._HallReservationService.createReservation(finalData).subscribe(
        (response) => {
          console.log('Reservation created successfully:', response);
          this.displayDialog = true;
          this.reservationForm.reset();
        },
        (error) => {
          console.error('Error creating reservation:', error);
          alert('Failed to submit the request. Please try again.');
        }
      );
    } else {
      alert('Please fill all required fields correctly.');
    }
  };

  onDialogOkClick() {
    this.displayDialog = false;
    this.router.navigate(['/Main/Home']);
  }

}
