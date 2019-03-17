import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from '../../models/product';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'price', 'other'];
  dataSource: MatTableDataSource<Product>;
  productClicked = false;
  product: Product = null;
  quantity: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _shopService: ShopService, private http: HttpClient) { }

  editRecord() {

  }
  reload() {
    this._shopService.getProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteRecord(id) {
    var ans = confirm("Do you want to product with Id: " + id);
    if (ans) {
      this._shopService.deleteProduct(id).subscribe((data) => {
        this.reload();
      }, error => console.error(error))
    }
  }

  addToCart() {
    var cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray')) || [];
    cartArray = this.mergeProductsInCart(cartArray);

    localStorage.setItem('itemsFromCartArray', JSON.stringify(cartArray));
    this._shopService.onCartChange.emit(cartArray.length);
    console.log("Product set to local storage");
  }

  mergeProductsInCart(cartArray) {
    var duplicate = false;
    if (cartArray != null) {
      for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i].name == this.product.name) {
          duplicate = true;
          var quantity = parseInt(cartArray[i].quantity);
          quantity += parseInt(this.quantity);
          cartArray[i].quantity = quantity;
        }
      }
      if (duplicate == false) cartArray.push({ "id": this.product.id, "name": this.product.name, "quantity": this.quantity, "price": this.product.price });
    } else {
      cartArray.push({ "id": this.product.id, "name": this.product.name, "quantity": this.quantity, "price": this.product.price });
    }
    return cartArray;
  }

  showProductInfo(e, id) {
    e.stopPropagation();
    this.quantity = null;
    this.productClicked = true;
    this._shopService.getProduct(id).subscribe((data: any) => this.product = data);
  }
  goBackToListProducts() {
    this.productClicked = false;
  }
  ngOnInit() {
    this.productClicked = false;
    this._shopService.getProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}