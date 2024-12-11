import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'; // Ensure you have a CartService
import { CartItem } from '../models/cart-item.model'; // Ensure you have a CartItem model
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutData = {
    address: '',
    paymentMethod: ''
  };

  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  username: string = '';

  private BASE_URL = 'http://localhost:8080/'; 
  constructor(
    private cartService: CartService, 
    private http: HttpClient, 
    private orderService: OrderService,
    private authService: AuthService) {}

    ngOnInit(): void {
      this.username = this.authService.getLoggedInUsername(); // username for specific user
      
      this.cartService.getCartItems(this.username).subscribe({
        next: (data: any[]) => { // Typing data as any[] because the response does not match CartItem directly
          console.log('Raw Cart Items:', data); // Log raw data to debug
          
          // Map raw data to match the CartItem interface
          this.cartItems = data.map(item => ({
            id: item.id,
            name: item.productName, // Map productName to name
            imageUrl: `${this.BASE_URL}${item.productImg}`, // Map productImg to imageUrl
            unitPrice: item.price, // Map price to unitPrice
            quantity: item.quantity,
            totalPrice:item.totalPrice//try
          }));
          console.log('Checkout cartItems:', this.cartItems); // Verify the transformation
        }
      })
    }
      // Method to calculate the total sum
      calculateTotal(): number {
      return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }
  
    //place order
    submitOrder(): void {
      const username = this.authService.getLoggedInUsername();
      const userId = this.authService.getLoggedInUserId();
      console.log("user id ",userId)
      const orderData = this.cartItems.map(item => ({
        productName: item.name,
        productImage: item.imageUrl,
        productId: item.id,
        quantity: item.quantity,
        price: item.unitPrice,
        totalPrice: item.totalPrice,
        custId: userId, // customer ID
        username: username,
        address: this.checkoutData.address,
        paymentMethod: this.checkoutData.paymentMethod,
        status: "Pending"
      }));
      
      this.orderService.placeOrder(orderData,userId).subscribe({
        next: (response) => {
          console.log('Order placed successfully:', response);
          alert('Order placed successfully!');
        },
        error: (error) => {
          console.error('Error placing order:', error);
          console.log('order data sending: ', orderData);
          alert('Failed to place order. Please try again.');
        }
      });
    }
  }

