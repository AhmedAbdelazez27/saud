import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,ToastModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  providers: [MessageService]
})
export class ContactUsComponent {

}
