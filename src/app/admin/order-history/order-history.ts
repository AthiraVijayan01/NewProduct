import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.css']
})
export class OrderHistory implements OnInit {

  orders: any[] = [];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const data = JSON.parse(localStorage.getItem('orders') || '[]');

    this.orders = data.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  updateStatus(index: number, status: string) {
    this.orders[index].status = status;
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  getTotalItems(order: any): number {
    return order.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
  }

  deleteOrder(index: number) {
    this.orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  clearAllOrders() {
    localStorage.removeItem('orders');
    this.orders = [];
  }
}