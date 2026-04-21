import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
  image?: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {

  cart: CartItem[] = [];
  groupedCart: any = {};
  categories: string[] = [];

  
  user: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('cart');
    this.cart = data ? JSON.parse(data) : [];
    this.groupByCategory();

 
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : {};
  }

  groupByCategory() {
    this.groupedCart = {};

    this.cart.forEach(item => {
      if (!this.groupedCart[item.category]) {
        this.groupedCart[item.category] = [];
      }
      this.groupedCart[item.category].push(item);
    });

    this.categories = Object.keys(this.groupedCart);
  }

  increase(item: CartItem) {
    item.quantity++;
    this.saveCart();
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.remove(item.id);
    }
    this.saveCart();
  }

  remove(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.groupByCategory();
  }

  getDiscount(item: CartItem): number {
    let discount = 0;

    switch (item.category) {
      case 'Electronics':
        discount += 10;
        if (item.price > 70000) discount += 2;
        break;
      case 'Clothing':
        discount += 20;
        break;
      case 'Furniture':
        discount += 15;
        if (item.price > 50000) discount += 3;
        break;
      case 'Groceries':
        discount += 5;
        break;
      case 'Books':
        discount += 8;
        break;
    }

    if (item.price > 50000) discount += 5;
    if (item.price < 1000) discount += 2;

    return Math.min(discount, 30);
  }
  getDiscountAmount(item: CartItem): number {
    return Number(((item.price * this.getDiscount(item)) / 100).toFixed(2));
  }
  getPriceAfterDiscount(item: CartItem): number {
    return Number((item.price - this.getDiscountAmount(item)).toFixed(2));
  }
  getItemTotal(item: CartItem): number {
    return Number((this.getPriceAfterDiscount(item) * item.quantity).toFixed(2));
  }
  getTotalDiscount(): number {
    return this.cart.reduce((sum, item) => {
      return sum + this.getDiscountAmount(item) * item.quantity;
    }, 0);
  }
  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }

  goBack() {
    this.router.navigate(['/view']);
  }

  gotoPayment() {
    this.router.navigate(['/payment']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  goTohome() {
    this.router.navigate(['/home']);
  }
}