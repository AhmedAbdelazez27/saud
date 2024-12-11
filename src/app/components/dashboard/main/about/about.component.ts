import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  selectedTab?: string ='General';

  constructor(private router:Router){

  }

  switchTab(tab: string): void {
    this.selectedTab = tab;
    this.router.navigate([`/Main/AboutUs/${tab}`]);
  }
}
