import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class Payment implements OnInit {

  cart: CartItem[] = [];
  total: number = 0;
  discount: number = 0;
  grandTotal: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('cart');
    this.cart = data ? JSON.parse(data) : [];

    if (!Array.isArray(this.cart)) {
      this.cart = [];
    }

    this.calculateTotal();
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

  calculateTotal() {
    const result = this.cart.reduce(
      (acc, item) => {
        const itemTotal = item.price * item.quantity;
        const discountPercent = this.getDiscount(item);
        const discountAmount = (item.price * discountPercent) / 100;

        acc.total += itemTotal;
        acc.discount += discountAmount * item.quantity;

        return acc;
      },
      { total: 0, discount: 0 }
    );

    this.total = Number(result.total.toFixed(2));
    this.discount = Number(result.discount.toFixed(2));
    this.grandTotal = Number((this.total - this.discount).toFixed(2));
  }

  confirmPayment() {
    if (this.cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const newOrder = {
      user: user,
      items: this.cart,
      total: this.total,
      discount: this.discount,
      grandTotal: this.grandTotal,
      date: new Date()
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    this.updateStockAfterOrder();

    alert(`Payment Successful!
Total: ₹${this.total}
Discount: ₹${this.discount}
Grand Total: ₹${this.grandTotal}`);

    localStorage.removeItem('cart');
    this.router.navigate(['/home']);
  }

  updateStockAfterOrder() {
    let products = JSON.parse(localStorage.getItem('products') || '[]');

    this.cart.forEach(cartItem => {
      products = products.map((p: any) => {
        if (p.id === cartItem.id) {
          const updatedStock = (p.stock || 0) - cartItem.quantity;

          return {
            ...p,
            stock: updatedStock < 0 ? 0 : updatedStock
          };
        }
        return p;
      });
    });

    localStorage.setItem('products', JSON.stringify(products));
  }

  goBack() {
    this.router.navigate(['/cart']);
  }
}