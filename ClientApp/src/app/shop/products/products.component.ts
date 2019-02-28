import { Component, OnInit, ViewChild } from '@angular/core';
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

  displayedColumns: string[] = ['name', 'quantity', 'price'];
  dataSource: MatTableDataSource<Product>;
  productClicked = false;
  product: Product;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private shopService: ShopService, private http: HttpClient) { }

  editRecord() {

  }
  deleteRecord() {

  }
  showProductInfo(e, id) {
    e.stopPropagation();
    console.log(id);
    this.productClicked = true;
    this.shopService.getProduct(id).subscribe((data: any) => this.product = data);
  }
  goBackToListProducts(){
    this.productClicked = false;
  }
  ngOnInit() {
    this.productClicked = false;
    this.shopService.getProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}