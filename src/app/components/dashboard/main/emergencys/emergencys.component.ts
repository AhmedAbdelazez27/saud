import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-emergencys',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './emergencys.component.html',
  styleUrl: './emergencys.component.scss'
})
export class EmergencysComponent {

}
