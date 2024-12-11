import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../services/auth/auth.service';
import { SearchService } from '../services/searchservice.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {
  query: string = '';
  products: any[] = [];
  searchTerm: string = ''; // Two-way bound to the input field
  private BASE_URL = 'http://localhost:8080/';

  constructor(
      private productService: ProductService, 
      private cartService: CartService, 
      private router: Router,
      private authService: AuthService,
      private searchService: SearchService) { }

  ngOnInit(): void {
    /*  this.productService.getProducts().subscribe(data => {
      this.products = data;
    });*/
  }

  search(): void {
    if (!this.searchTerm.trim()) return;

    // Notify other components about the query
    this.searchService.updateSearchQuery(this.searchTerm);

    // Fetch search results
    this.productService.searchProducts(this.searchTerm).subscribe((data: any[]) => {
      const results = data.map(product => ({
        ...product,
        image_path: `http://localhost:8080/${product.image_path}`, // Adjust BASE_URL
      }));
      this.searchService.updateSearchResults(results); // Notify other components about the results
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
      quantity: 1, // Adjust quantity as needed
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
   }
 }
}

