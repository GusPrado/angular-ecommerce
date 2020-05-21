import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Order } from 'src/app/shared/models/order';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { Shipping } from 'src/app/shared/models/shipping';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart
  shipping: Shipping = {}
  userId: string
  userSubscription: Subscription

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {

    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy(): void {

    this.userSubscription.unsubscribe()
  }

  async placeOrder() {

    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order)
    this.router.navigate(['/order-success', result.key])

  }

}
