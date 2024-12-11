import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService, Product } from '../product.service';
import { UserStorageService } from '../services/storage/user-storage.service';
import { CartItem } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    //private apiUrl = 'http://localhost:8080/api/cart'; // Adjust the URL if necessary
     private baseUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

  // Fetch cart items for a specific user
  getCartItems(username: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}?username=${username}`);
  }

  addToCart(username: string, productId: number, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(
      `${this.baseUrl}/add?username=${username}&productId=${productId}&quantity=${quantity}`,
      {}
    );
  }

  // Remove an item from the cart
  removeCartItem(username: string, cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${cartItemId}?username=${username}`);
  }

  updateQuantity(username: string, cartItemId: number, quantity: number): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/update-quantity`,
      { username, cartItemId, quantity }  // The body is now a JSON object
    ); 

  }
}
