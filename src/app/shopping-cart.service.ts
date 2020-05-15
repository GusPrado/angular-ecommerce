import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';

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

  async getCart() {

    const cartId = await this.getOrCeateCartId()

    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
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

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1)
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCeateCartId()
    let item$ = this.getItem(cartId, product.key)
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      item$.update({ product: product, quantity: (item.payload.child('/items').val() || 0) + change })
      // item$.update({ product: product, quantity: (item.payload.exportVal().quantity || 0) + 1 })
      // if (item) item$.update({ quantity: item.quantity + 1 })
      // else item$.set({ product: product, quantity: 1 })
    })
  }
}
