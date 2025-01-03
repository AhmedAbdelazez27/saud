import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-polices',
  standalone: true,
  imports: [CommonModule,RouterModule,TranslateModule],
  templateUrl: './polices.component.html',
  styleUrl: './polices.component.scss'
})
export class PolicesComponent {

}
