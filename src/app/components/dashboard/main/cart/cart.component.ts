import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: any[] = [];
  totalSum: number = 0;

  constructor() {}

  ngOnInit(): void {
    // Load items from local storage
    const storedItems = localStorage.getItem('items');
    this.items = storedItems ? JSON.parse(storedItems) : [];
    this.calculateTotal(); // Calculate the total sum initially
  }

  // Calculate total sum
  calculateTotal(): void {
    this.totalSum = this.items.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  }

  // Remove item by index
  removeItem(index: number): void {
    this.items.splice(index, 1); // Remove item from the array
    localStorage.setItem('items', JSON.stringify(this.items)); // Update local storage
    this.calculateTotal(); // Recalculate the total sum
  }
}
