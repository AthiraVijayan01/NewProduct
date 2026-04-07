import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { View } from './pages/view/view';
import { Cart } from './pages/cart/cart';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  
import { Registration } from './pages/registration/registration';
import { Profile } from './pages/profile/profile';
import { ForgotPassword } from './pages/forgotpassword/forgotpassword';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('products');
}
