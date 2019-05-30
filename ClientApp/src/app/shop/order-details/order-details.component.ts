import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../models/user-details';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  userDetails: UserDetails;

  constructor(private _shopService: ShopService, private router: Router,) {
    this.userDetails = new UserDetails;
   }

  ngOnInit() {
  }

  goToSummary(){
    localStorage.setItem('addressInfo', JSON.stringify(this.userDetails));
    this.router.navigate(['/shop/summary']);
  }
  
}
