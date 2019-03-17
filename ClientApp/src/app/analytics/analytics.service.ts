import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getAnalyticsData() {
    return this.http.get('/api/Predictions/');
  }
  getPastTransactionData() {
    return this.http.get('/api/OrderSimplifieds/');
  }
}
