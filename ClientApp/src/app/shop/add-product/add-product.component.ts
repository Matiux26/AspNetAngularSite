import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';

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
  public progress: number;
  public message: string;
  uploadReq: HttpRequest<FormData>;

  constructor(private _shopService: ShopService, private _router: Router,
    private _avRoute: ActivatedRoute, private http: HttpClient) {
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
    this.http.request(this.uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }
  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files){
      formData.append(file.name, file);
      this.product.image = "Upload/" + file.name;
    }

    this.uploadReq = new HttpRequest('POST', 'api/upload', formData, {
      reportProgress: true,
    });
  }
  cancel() {
    this._router.navigate(['/shop/products']);
  }

}
