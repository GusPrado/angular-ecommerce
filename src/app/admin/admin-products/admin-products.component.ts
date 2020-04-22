import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: Product[]
  //subscription: Subscription

  constructor(private productService: ProductService) {
    this.productService.getAll()
      .subscribe(prods => this.products = prods)
   }

  ngOnInit() {
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }

  // <-- REPLACED BY DATATABLE SEARCH -->
  // filter(query: string) {
  //   this.filteredProducts = (query) ?
  //     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  //     this.products
  // }

}
