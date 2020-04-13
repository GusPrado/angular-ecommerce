import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { HomeComponent } from './home/home.component';
import { ProdutsComponent } from './produts/produts.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProdutsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },

  { path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate:[AuthGuard] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate:[AuthGuard] },

  { path: 'admin/products', component: AdminProductsComponent, canActivate:[AuthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
