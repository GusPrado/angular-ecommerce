import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit{
  products: Product[] = []
  filteredProducts: Product[] = []
  category: string
  cart$: Observable<ShoppingCart>

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ) {

    }

    async ngOnInit() {

      this.cart$ = await this.shoppingCartService.getCart()
      this.populateProducts()
    }

    private populateProducts() {

      this.productService
      .getAll()
      .pipe(switchMap(products => {
          this.products = products
          return this.route.queryParamMap
        }))
      .subscribe(params => {
        this.category = params.get('category')
        this.applyFilter()
      })
    }

    private applyFilter() {
      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products

    }
}
