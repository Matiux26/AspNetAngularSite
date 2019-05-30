import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from '../../models/product';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['image','name', 'quantity', 'price'];
  dataSource: MatTableDataSource<Product>;
  productClicked = false;
  product: Product = null;
  quantity: any;
  role: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _shopService: ShopService, private http: HttpClient,
              private _authService: AuthService, private _authGuardService: AuthGuardService,
              private _snackBar: MatSnackBar) { 
                this.checkUserRole();
                if(this.role == "admin"){
                   this.displayedColumns.push("other");
                }else{
                  this.displayedColumns = ['image','name', 'quantity', 'price'];
                }
              }

  reload() {
    this._shopService.getProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteRecord(id) {
    var ans = confirm("Czy na pewno chcesz usunąć produkt o Id: " + id);
    if (ans) {
      this._shopService.deleteProduct(id).subscribe((data) => {
        this.reload();
      }, error => console.error(error))
    }
  }

  addToCart() {
    if(this.product.quantity >= this.quantity){
    var cartArray = JSON.parse(localStorage.getItem('itemsFromCartArray')) || [];
    cartArray = this.mergeProductsInCart(cartArray);

    localStorage.setItem('itemsFromCartArray', JSON.stringify(cartArray));
    this._shopService.onCartChange.emit(cartArray.length);
    this.product.quantity -= this.quantity;
    }else{
      let snackBarRef = this._snackBar.open('Niewystarczająca ilość produktu na magazynie', 'X');
    }
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
    this.reload();
  }
  ngOnInit() {
    this.reload();
    this.productClicked = false;
    this._shopService.getProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  checkUserRole() {
    this.role = this._authService.checkUserRole();
  }
}