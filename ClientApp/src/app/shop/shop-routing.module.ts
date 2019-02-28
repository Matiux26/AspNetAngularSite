import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
  { path: 'products', component:  ProductsComponent },
  { path: 'basket', component:  BasketComponent },
  { path: 'product-info/:id', component:  ProductInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
