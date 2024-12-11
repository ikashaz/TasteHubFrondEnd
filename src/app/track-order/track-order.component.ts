import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
})
export class TrackOrderComponent {
  orderId: string = '';
  order: any;

  constructor(private orderService: OrderService) {}

  trackOrder() {
    if (this.orderId.trim()) {
      this.orderService.getOrder(this.orderId).subscribe(
        (response) => {
          this.order = response;
        },
        (error) => {
          console.error('Order not found', error);
          alert('Order not found!');
        }
      );
    }
  }
}

