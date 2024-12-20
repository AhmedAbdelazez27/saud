import { Component, OnInit } from '@angular/core';
import { AboutusService } from '../../servicesApi/aboutus.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../../shared/services/spinner.service';
import { TranslateService } from '@ngx-translate/core';
interface BoardMember {
positionAr: any;
meberNameAr: any;
  meberNameEn: string;
  positionEn: string;
  imagePath: string;
  descriptionEn?: string; // Optional if not always present
}

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  aboutBoardOfDirectors: BoardMember[] = []; // Explicitly set the type
  currentLang: string;

  constructor(
    private _AboutusService: AboutusService,
    private router: Router,
    private _SpinnerService: SpinnerService, private translate: TranslateService
      ){
        this.currentLang = this.translate.currentLang || this.translate.defaultLang;}

  ngOnInit(): void {
    this.gettingAboutInfo();
  }

  gettingAboutInfo() {
    this._SpinnerService.showSpinner();
    this._AboutusService.aboutBoardOfDirectors().subscribe({
      next: (res) => {
        console.log(res.result);
        this.aboutBoardOfDirectors = [...res.result as BoardMember[]]; // Cast result to the correct type
        this._SpinnerService.hideSpinner();
      },
      error: (err) => {
        this._SpinnerService.hideSpinner();
      }
    });
  }
}
