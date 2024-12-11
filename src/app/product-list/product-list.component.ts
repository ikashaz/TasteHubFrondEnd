// src/app/product-list/product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../services/auth/auth.service';
import { CartItem } from '../models/cart-item.model';
import { SearchService } from '../services/searchservice.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchResults: Product[] | null = null; // Holds search results

  private BASE_URL = 'http://localhost:8080/'; // Change to production URL when deploying

  constructor(
    private productService: ProductService,
    private cartService: CartService,  
    private router: Router,   
    private authService:AuthService,
    private searchService: SearchService)
    {}

  ngOnInit(): void {
    this.getProducts();


    // Subscribe to search results
    this.searchService.searchResults$.subscribe(results => {
      this.searchResults = results;
    });
}

  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        image_path: `${this.BASE_URL}${product.image_path}` // Prepend base URL
      }));
      console.table(this.products); // Check the final paths
    });
  }

  addToCart(product: any) {
    //send information from product page to cart page
    // Create a CartItem object
    const cartItem: CartItem = {
      id:product.id,
      imageUrl: product.image_path,
      name: product.name,
      unitPrice: product.price,
      quantity: 1 ,// Adjust quantity as needed
      totalPrice:null
    };

   // Get the logged-in user's username
   const username = this.authService.getLoggedInUsername();
   console.log(username);

   // If the user is logged in, proceed to add the item to the cart
   if (username) {
     const quantity = 1;  // You can adjust this based on your UI input (e.g., a quantity picker)

     // Call CartService to add the item to the cart on the server
     this.cartService.addToCart(username, product.id, quantity).subscribe(
       (addedItem: CartItem) => {
         // Handle success, e.g., show a message, update the cart UI, etc.
         console.log('Item added to cart:', addedItem);
       },
       (error) => {
         // Handle error (e.g., show an error message)
         console.error('Error adding item to cart:', error);
       }
     );
   } else {
     // If user is not logged in, navigate to the login page or show a message
     console.log('User is not logged in.');
     this.router.navigate(['/login']); // Redirect to cart

   }
 }
}

  
