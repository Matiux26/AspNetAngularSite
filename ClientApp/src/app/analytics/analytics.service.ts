import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getAnalyticsData() {
    return this.http.get('/api/Predictions/');
  }
  getPastTransactionData() {
    const a$ = this.http.get('/api/Orders/');
    const b$ = this.http.get('/api/Order_items/');
    return forkJoin(a$, b$);
  }
}
