import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product
  @Input('shopping-cart') shoppingCart

  constructor(private cartService: ShoppingCartService) {

  }

  addToCart() {
    this.cartService.addToCart(this.product)
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product)
  }

}
