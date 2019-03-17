import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  title: string = "Create";
  product: Product;
  productID: number;
  errorMessage: any;

  constructor(private _shopService: ShopService, private _router: Router,
    private _avRoute: ActivatedRoute) {
    if (this._avRoute.snapshot.params["id"]) {
      this.productID = this._avRoute.snapshot.params["id"];
    }
    this.product = new Product();
  }
  ngOnInit() {

    if (this.productID > 0) {
      this.title = "Edit";
      this._shopService.getProduct(this.productID)
        .subscribe((resp: Product) => this.product = resp
          , error => this.errorMessage = error);
    }

  }

  save() {

    if (this.title == "Create") {
      this._shopService.addProduct(this.product)
        .subscribe((data) => {
          this._router.navigate(['/shop/products']);
        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this._shopService.updateProduct(this.product.id, this.product)
        .subscribe((data) => {
          this._router.navigate(['/shop/products']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/shop/products']);
  }

}
