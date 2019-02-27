import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from '../../models/product';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'price'];
  dataSource: MatTableDataSource<Product>;

  //public productData: Array<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private shopService: ShopService) { }

  editRecord() {

  }
  deleteRecord() {

  }

  ngOnInit() {
    this.shopService.getProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    //this.dataSource = new MatTableDataSource<Product>(this.productData);
  }

}