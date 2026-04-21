import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="display:flex; height:100vh;">

      <div style="width:200px; background:#2c3e50; color:white; padding:15px;">
        <h2>Admin</h2>

        <button routerLink="/admin/dashboard">Dashboard</button><br><br>
        <button routerLink="/admin/products">Products</button><br><br>
        <button routerLink="/admin/users">Users</button><br><br>

        <button (click)="logout()">Logout</button>
      </div>

      <div style="flex:1; padding:20px;">
        <router-outlet></router-outlet>
      </div>

    </div>
  `
})
export class AdminLayout {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}