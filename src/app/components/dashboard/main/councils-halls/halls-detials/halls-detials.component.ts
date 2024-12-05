import { Component, OnInit, ViewChild } from '@angular/core';
import { LandingService } from '../../servicesApi/landing.service';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HallReservationService } from '../../servicesApi/hall-reservation.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal for handling modal display
import { DialogModule } from 'primeng/dialog';



@Component({
  selector: 'app-halls-detials',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule],
  templateUrl: './halls-detials.component.html',
  styleUrl: './halls-detials.component.scss'
})
export class HallsDetialsComponent implements OnInit {
  currentItem: any;
  reservationForm: FormGroup;
  typeOfEventOptions: any[] = [];
  otherOptions: any[] = [];
  hallID: any;
  displayDialog: boolean = false;

  constructor(
    private landingService: LandingService,
    private _SpinnerService: SpinnerService,
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private hallReservationService: HallReservationService,
    private modalService: NgbModal  // Inject modal service

  ) {
    this.reservationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      idNumber: ['', Validators.required],
      eventDate: ['', Validators.required],
      numberOfInvitees: ['', Validators.required],
      typeOfEventLkpId: ['', Validators.required],
      otherOptionsLkpId: ['', Validators.required],
      notes: ['']
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      let id = params['hallId']; // Access visitId from the URL  
      this.hallID = id;
      this.gettingSingleHallCouncil(id);

    });
    this.fetchTypeOfEventOptions();
    this.fetchOtherOptions();

  }


  gettingSingleHallCouncil(id: any) {
    this._SpinnerService.showSpinner();
    this.landingService.getSingleHallCouncils(id).subscribe({
      next: (res) => {
        console.log(res.result);
        this.currentItem = res.result;
        this._SpinnerService.hideSpinner();
      }
    })
  };

  // Fetch TypeOfEvent options
  fetchTypeOfEventOptions() {
    this.hallReservationService.getTypeOfEventOptions().subscribe((response) => {
      this.typeOfEventOptions = response.result.results;
    });
  }

  // Fetch OtherOptions
  fetchOtherOptions() {
    this.hallReservationService.getOtherOptions().subscribe((response) => {
      this.otherOptions = response.result.results;
    });
  }

  // Submit form
  submitForm() {
    const finalData = { ...this.reservationForm.value, eventDate: this.formatDate(this.reservationForm.value?.eventDate), websiteHallsCouncilId: this.hallID }
    if (this.reservationForm.valid) {
      this.hallReservationService
        .createHallReservation(finalData)
        .subscribe({
          next: (response) => {
            console.log('Reservation successful', response);
            // Trigger the modal to show on success
            this.displayDialog = true;
            this.reservationForm.reset();
          },
          error: (error) => {
            console.error('Error submitting reservation', error);
            alert('Error submitting reservation');
          },
        });
    } else {
      alert('Please fill all required fields correctly.');
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
