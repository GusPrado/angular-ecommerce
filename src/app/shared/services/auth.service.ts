import { UserService } from 'src/app/shared/services/user.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { Observable, of } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = afAuth.authState
  }

  login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  logout(){
    this.afAuth.auth.signOut()
    this.router.navigateByUrl('/login')
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges()

        return of(null)
        })
      )
  }
}
