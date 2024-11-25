import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-lists',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './services-lists.component.html',
  styleUrl: './services-lists.component.scss'
})
export class ServicesListsComponent {

  constructor(private router:Router){

  }
  goDetails(id:any){
    this.router.navigate([`Main/Services/Details/${id}`]);
  }
}
