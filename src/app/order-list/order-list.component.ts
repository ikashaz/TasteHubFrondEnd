import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  orders: any[] = [];
  userId: number = 0; // Example userId, can be dynamic based on the user
  displayedColumns: string[] = ['id', 'ProductName', 'price','quantity','amount', 'status']; // Declare the columns here

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.userId = this.authService.getLoggedInUserId();
    this.orderService.getOrdersByUserId(this.userId).subscribe((data) => {
      this.orders = data;
    });
    console.log("the order list :", this.orders)
  }

  // You can also add a method to update the userId dynamically and fetch orders again
  updateUserId(userId: number) {
    this.userId = userId;
    this.fetchOrders();
  }
}
