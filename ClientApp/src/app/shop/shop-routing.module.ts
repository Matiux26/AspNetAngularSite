import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: 'products', component:  ProductsComponent },
  { path: 'basket', component:  BasketComponent },
  { path: 'edit/:id', component:  AddProductComponent, canActivate: [AuthGuardService] },
  { path: 'addProduct', component:  AddProductComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
