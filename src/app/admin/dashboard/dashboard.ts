import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, DoCheck {

  totalProducts = 0;
  totalOrders = 0;
  totalUsers = 0;
  totalRevenue = 0;
  lowStockCount = 0;

  ngOnInit() {
    this.loadDashboardData();
  }

  ngDoCheck() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    this.totalProducts = products.length;
    this.totalOrders = orders.length;
    this.totalUsers = users.length;

    this.totalRevenue = orders.reduce((sum: number, order: any) => {
      return sum + (order.grandTotal || 0);
    }, 0);

    this.lowStockCount = products.filter((p: any) => p.stock <= 5).length;
  }
}