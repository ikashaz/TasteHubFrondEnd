import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories = [
    {
      name: 'Western Food',
      images: ['assets/images/product1.jpg', 'assets/images/product5.jpg']
    },
    {
      name: 'Dessert',
      images: ['assets/images/product2.jpg', 'assets/images/product4.jpg']
    },
    {
      name: 'Korean Food',
      images: ['assets/images/product8.jpg', 'assets/images/product9.jpg']
    },
    {
      name: 'Fast Food',
      images: ['assets/images/product6.jpg', 'assets/images/product7.jpg']
    },
    {
      name: 'Ice Cream',
      images: ['assets/images/product3.jpg', 'assets/images/product10.jpg']
    },

    // Add more categories as needed
  ];
}