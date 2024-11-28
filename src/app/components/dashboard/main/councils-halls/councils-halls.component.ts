import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-councils-halls',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './councils-halls.component.html',
  styleUrl: './councils-halls.component.scss'
})
export class CouncilsHallsComponent {

}
