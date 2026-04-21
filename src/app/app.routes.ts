import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Registration } from './auth/registration/registration';
import { Home } from './user/home/home';
import { Cart } from './user/cart/cart';
import { View } from './user/view/view';
import { Profile } from './user/profile/profile';
import { Payment } from './user/payment/payment';
import { ForgotPassword } from './user/forgotpassword/forgotpassword';

import { Dashboard } from './admin/dashboard/dashboard';
import { ProductManagement } from './admin/product-management/product-management';
import { UserManagement } from './admin/user-management/user-management';
import { AdminLayout } from './admin/admin-layout/admin-layout';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'registration', component: Registration },
  { path: 'forgotpassword', component: ForgotPassword },

  { path: 'home', component: Home },
  { path: 'cart', component: Cart },
  { path: 'view', component: View },
  { path: 'profile', component: Profile },
  { path: 'payment', component: Payment },

  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: ProductManagement },
      { path: 'users', component: UserManagement }
    ]
  },

  { path: '**', redirectTo: 'login' }
];