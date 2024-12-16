import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private cartService: CartService ){

  }
  ngOnInit(): void {
    this.addItemToCart();
  }

  addItemToCart(): void {
    const item = localStorage.getItem('items');
    const parsedItem = item ? JSON.parse(item) : [];
    this.cartService.addToCart(parsedItem);
  }
}
