import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { SummaryComponent } from './summary/summary.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AwaitingOrdersComponent } from './awaiting-orders/awaiting-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  { path: 'products', component:  ProductsComponent },
  { path: 'basket', component:  BasketComponent },
  { path: 'edit/:id', component:  AddProductComponent, canActivate: [AuthGuardService] },
  { path: 'addProduct', component:  AddProductComponent, canActivate: [AuthGuardService] },
  { path: 'address', component:  OrderDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'summary', component:  SummaryComponent, canActivate: [AuthGuardService] },
  { path: 'awaitingOrders', component:  AwaitingOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'myOrders', component:  MyOrdersComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
