import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-councils-halls',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './councils-halls.component.html',
  styleUrl: './councils-halls.component.scss'
})
export class CouncilsHallsComponent {

}
