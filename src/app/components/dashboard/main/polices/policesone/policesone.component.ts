import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-policesone',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './policesone.component.html',
  styleUrl: './policesone.component.scss'
})
export class PolicesoneComponent {
 currentLanguage:any

  constructor(  private translate: TranslateService
    ) {
      // Determine the language direction dynamically
      this.currentLanguage = localStorage.getItem('language') || 'en';
  }
}
