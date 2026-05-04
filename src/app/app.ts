import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { View } from './user/view/view';
import { Cart } from './user/cart/cart';
import { Home } from './user/home/home';
import { Login } from './auth/login/login';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  
import { Registration } from './auth/registration/registration';
import { Profile } from './user/profile/profile';
import { ForgotPassword } from './user/forgotpassword/forgotpassword';

import { Dashboard } from './admin/dashboard/dashboard';
import { ProductManagement } from './admin/product-management/product-management';
import { UserManagement } from './admin/user-management/user-management';
import { Wishlist } from './admin/wishlist/wishlist';
import { OrderHistory } from './admin/order-history/order-history';
import { StockExchange } from './admin/stock-exchange/stock-exchange';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('products');
}
