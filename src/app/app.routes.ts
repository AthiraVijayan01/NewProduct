import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { View } from './pages/view/view';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { Payment } from './pages/payment/payment';
import { Registration } from './pages/registration/registration';
import { Profile } from './pages/profile/profile';
import { ForgotPassword } from './pages/forgotpassword/forgotpassword';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {path:'forgotpassword',component:ForgotPassword},
  { path: 'registration', component: Registration }, 
  { path: 'home', component: Home },
  {path:'profile',component:Profile},
  { path: 'view', component: View },
  { path: 'cart', component: Cart },
  { path: 'payment', component: Payment }
];