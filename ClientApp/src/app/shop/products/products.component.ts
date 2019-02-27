import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productData: Array<Product>;

  constructor (private shopService: ShopService) {
    shopService.getProducts().subscribe((data: any) => this.productData = data);
  }
  editRecord(){

  }
  deleteRecord(){
    
  }
  ngOnInit() {
  }

}
