import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTableModule, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatPaginatorModule,
    MatSnackBarModule,
    FormsModule,
    MatTableModule
  ],
  declarations: [ProductsComponent, BasketComponent, AddProductComponent]
})
export class ShopModule { }
