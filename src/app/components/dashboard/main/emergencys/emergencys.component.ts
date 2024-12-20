import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-emergencys',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './emergencys.component.html',
  styleUrl: './emergencys.component.scss'
})
export class EmergencysComponent {

}
