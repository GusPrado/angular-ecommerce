import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$
  product = {}
  id

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories()

    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) this.productService.getOne(this.id).valueChanges().subscribe(p => this.product = p)
   }

  ngOnInit() {
  }

  save(product) {
    if (this.id) this.productService.updateOne(this.id, product)
    else this.productService.create(product)

    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteOne(this.id)

      this.router.navigate(['/admin/products'])
    }
  }

}
