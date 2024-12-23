import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-donations-details',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './donations-details.component.html',
  styleUrl: './donations-details.component.scss'
})
export class DonationsDetailsComponent {
  // Phone number to which the SMS will be sent
  private phoneNumber = '1234567890';

  sendSMS(value: string): void {
    const messageBody = `Your selected value is ${value} درهم.`;

    // Construct the SMS URL
    const smsUrl = `sms:${this.phoneNumber}?body=${encodeURIComponent(messageBody)}`;

    // Redirect to the SMS URL
    window.location.href = smsUrl;
  }
}
