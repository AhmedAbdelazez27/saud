import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {}

  addToCart(item: any): void {
    if (Array.isArray(item)) {
      console.log('Item is an array:', item);
      this.cartItems = [...this.cartItems , ...item]
    } else if (item && typeof item === 'object') {
      console.log('Item is an object:', item);
      this.cartItems.push(item)
    } else {
      console.log('Item is neither an array nor an object or is null/undefined');
    }

    this.cartCountSubject.next(this.cartItems.length);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  // Remove item from the cart
  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.cartCountSubject.next(this.cartItems.length);
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = [];
  }

  // Get cart count
  getCartCount(): number {
    console.log("this.cartItems = ",this.cartItems);
    
    return this.cartItems.length;
  }
}
