import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {
  products: Product[] = []
  filteredProducts: Product[] = []
  category: string

  constructor(
    productService: ProductService,
    route: ActivatedRoute
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

  ngOnInit() {
  }

}
