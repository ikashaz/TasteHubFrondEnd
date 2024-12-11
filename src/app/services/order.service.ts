import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; // Adjust to your backend URL
  

  constructor(private http: HttpClient) {}

  /*placeOrder(orderData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, orderData, { headers: headers });
  }*/

  placeOrder(orderData: any,userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}`, orderData);
  }

  getOrder(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }

  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/list/${userId}`); // Correct usage of path variable
  }
}
