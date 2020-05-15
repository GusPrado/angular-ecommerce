import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser
  cart$: Observable<any>

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
    ) {}

    async ngOnInit() {

      this.auth.appUser$.subscribe(appUser => this.appUser = appUser)

      this.cart$ = await this.shoppingCartService.getCart()

  }

  logout() {
    this.auth.logout()
  }
}
