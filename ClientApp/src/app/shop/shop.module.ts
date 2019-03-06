import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';


@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule
  ],
  declarations: [ProductsComponent, BasketComponent]
})
export class ShopModule { }
