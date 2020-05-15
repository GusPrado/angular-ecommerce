import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit, OnDestroy {
  products: Product[] = []
  filteredProducts: Product[] = []
  category: string
  cart: any
  subscription: Subscription

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ) {

      productService
          .getAll()
          .pipe(switchMap(products => {
              this.products = products
              return route.queryParamMap
            }))
          .subscribe(params => {

            this.category = params.get('category')

            this.filteredProducts = (this.category) ?
              this.products.filter(p => p.category === this.category) :
              this.products
          })
   }
  ngOnDestroy(): void {

    this.subscription.unsubscribe()
  }

  async ngOnInit() {

    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => {
        this.cart = cart.payload.child('/items').val()
        //this.cart = cart
        console.log('carrinho:', this.cart)
      })
  }

}
