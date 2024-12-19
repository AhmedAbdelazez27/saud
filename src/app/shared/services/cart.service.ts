import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface UserData {
  userName: string;
  IdNumber: string;
  BeneficentName: string;
  MobileNumber1: string;
  EmailAddress: string;
  userId: string;

}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private userData: UserData | null = null; 

  private cartCountSubject = new BehaviorSubject<number>(0);
  private userDataSubject = new BehaviorSubject<UserData | null>(null); 

  cartCount$ = this.cartCountSubject.asObservable(); 
  userData$ = this.userDataSubject.asObservable();

  constructor() {}
  addToCart(item: any): void {
    if (Array.isArray(item)) {
      console.log('Item is an array:', item);
      this.cartItems = [...this.cartItems, ...item];
    } else if (item && typeof item === 'object') {
      console.log('Item is an object:', item);
      this.cartItems.push(item);
    } else {
      console.log('Item is neither an array nor an object or is null/undefined');
    }
    this.cartCountSubject.next(this.cartItems.length); 
  }

  setUserName(userData: UserData): void {

    this.userData = userData; 
    this.userDataSubject.next(userData); 
  }

  getUserName(): UserData | null {
    return this.userData; 
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.cartCountSubject.next(this.cartItems.length); 
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartCountSubject.next(this.cartItems.length); 
  }

  getCartCount(): number {
    return this.cartItems.length;
  }
}
