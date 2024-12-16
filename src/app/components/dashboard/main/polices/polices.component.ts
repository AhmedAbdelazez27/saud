import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-polices',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './polices.component.html',
  styleUrl: './polices.component.scss'
})
export class PolicesComponent {

}
