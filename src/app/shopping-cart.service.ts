import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  //async getCart() {
  async getCart(): Promise<Observable<ShoppingCart>> {

    const cartId = await this.getOrCeateCartId()

    return this.db.object('/shopping-carts/' + cartId)
    .snapshotChanges()
    //.pipe(map((data) => console.log('data', data.payload.child('/items').val())))
    .pipe(map((items) => new ShoppingCart(items.payload.child('/items').val())))
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCeateCartId()
    this.db.object('/shopping-carts/' + cartId + '/items').remove()
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`)
  }

  private async getOrCeateCartId() {

    let cartId = localStorage.getItem('cartId')

    if (cartId) return cartId

    let result = await this.create()
    localStorage.setItem('cartId', result.key)
    return result.key

  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCeateCartId()
    let item$ = this.getItem(cartId, product.key)
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let quantity = (item.payload.child('/quantity').val() || 0) + change

      if (quantity === 0 ) item$.remove()
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      })
      // item$.update({ product: product, quantity: (item.payload.exportVal().quantity || 0) + 1 })
      // if (item) item$.update({ quantity: item.quantity + 1 })
      // else item$.set({ product: product, quantity: 1 })
    })
  }
}
