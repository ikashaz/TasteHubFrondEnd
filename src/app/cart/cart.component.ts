import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth/auth.service';
import { CartItem } from '../models/cart-item.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  username: string = '';

  private BASE_URL = 'http://localhost:8080/'; 

  constructor(private cartService: CartService, private authService: AuthService) {}

    ngOnInit(): void {
      this.username = this.authService.getLoggedInUsername(); // Adjust based on your auth service implementation
      this.loadCartItems();
    }

  
    loadCartItems() {
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
            totalPrice:item.Totalprice//try
          }));
    
          console.log('Transformed cartItems:', this.cartItems); // Verify the transformation
          this.calculateCartTotals();
        },
        error: (err) => {
          console.error('Error loading cart items:', err);
        }
      });
    }

  // Increment quantity of a cart item
  incrementQuantity(cartItem: CartItem) {
    cartItem.quantity++;
    this.updateCartItem(cartItem);
  }

  // Decrement quantity of a cart item
  decrementQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.updateCartItem(cartItem);
    }
  }

  // Update cart item quantity on the server
  updateCartItem(cartItem: CartItem) {
    this.cartService
      .updateQuantity(this.username, cartItem.id, cartItem.quantity)
      .subscribe(() => this.calculateCartTotals());
  }

  remove(cartItem: CartItem) {
    const username = this.authService.getLoggedInUsername();  // Ensure this is correctly fetching the username
    if (!username) {
      console.error('User is not logged in.');
      return; // Prevent making the API call if the user is not logged in
    }
  
    this.cartService.removeCartItem(username, cartItem.id).subscribe(
      () => {
        // Remove the item from the cart in the UI
        this.cartItems = this.cartItems.filter((item) => item.id !== cartItem.id);
        this.calculateCartTotals();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  // Calculate total quantity and price
  calculateCartTotals() {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth/auth.service';

interface CartItem {
    id: number;
    productImg: string;
    name: string;
    price: number;
    quantity: number;
}

interface ProductToAdd {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  username: string = '';

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getLoggedInUsername(); // Adjust based on your auth service implementation
    this.loadCartItems();
  }

  // Load cart items and calculate totals
  loadCartItems() {
    this.cartService.getCartItems(this.username).subscribe((data) => {
      this.cartItems = data;
      this.calculateCartTotals();
    });
  }

  // Increment quantity of a cart item
  incrementQuantity(cartItem: CartItem) {
    cartItem.quantity++;
    this.updateCartItem(cartItem);
  }

  // Decrement quantity of a cart item
  decrementQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.updateCartItem(cartItem);
    }
  }

  // Update cart item quantity on the server
  updateCartItem(cartItem: CartItem) {
    this.cartService
      .updateQuantity(this.username, cartItem.id, cartItem.quantity)
      .subscribe(() => this.calculateCartTotals());
  }

  // Remove a cart item
  remove(cartItem: CartItem) {
    this.cartService.removeCartItem(this.username, cartItem.id).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== cartItem.id);
      this.calculateCartTotals();
    });
  }

  // Calculate total quantity and price
  calculateCartTotals() {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
  }
}*/
