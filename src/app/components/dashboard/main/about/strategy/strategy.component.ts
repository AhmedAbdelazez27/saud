import { Component, OnInit } from '@angular/core';
import { AboutusService } from '../../servicesApi/aboutus.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../../../shared/services/spinner.service';

@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './strategy.component.html',
  styleUrl: './strategy.component.scss'
})
export class StrategyComponent implements OnInit {
  
  aboutStrategy: any[] = []; // Explicitly set the type

  constructor(
    private _AboutusService: AboutusService,
    private router: Router,
    private _SpinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.gettingAboutInfo();
  }

  gettingAboutInfo() {
    this._SpinnerService.showSpinner();
    this._AboutusService.aboutStrtegies().subscribe({
      next: (res) => {
        console.log(res.result);
        this.aboutStrategy = [...res.result as any[]]; // Cast result to the correct type
        this._SpinnerService.hideSpinner();
      },
      error: (err) => {
        this._SpinnerService.hideSpinner();
      }
    });
  }
}
