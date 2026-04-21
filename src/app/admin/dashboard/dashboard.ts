import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  totalProducts = 0;
  totalOrders = 0;
  totalUsers = 0;
  totalRevenue = 0;

  ngOnInit() {
    console.log("Dashboard loaded");
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
      return sum + (order.totalAmount || 0);
    }, 0);
  }
}