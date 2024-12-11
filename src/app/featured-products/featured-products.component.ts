import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent {
  products = [
    { name: 'Chicken Set', price: 19.99, image: 'assets/images/product1.jpg' },
    { name: 'Chocolate Cake', price: 29.99, image: 'assets/images/product2.jpg' },
    { name: 'Ice cream', price: 29.99, image: 'assets/images/product3.jpg' },
    { name: 'Pancake', price: 29.99, image: 'assets/images/product4.jpg' },
    { name: 'Spagetti', price: 29.99, image: 'assets/images/product5.jpg' },
    { name: 'Pizza', price: 29.99, image: 'assets/images/product6.jpg' },
    { name: 'Burger', price: 29.99, image: 'assets/images/product7.jpg' },
    { name: 'Korean Bibimbap', price: 29.99, image: 'assets/images/product8.jpg' },
    { name: 'Korean Cuisine', price: 29.99, image: 'assets/images/product9.jpg' },
    { name: 'Bingsu', price: 29.99, image: 'assets/images/product10.jpg' },
    // Add more products as needed
  ];
}
