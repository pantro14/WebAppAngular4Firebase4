import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './providers/auth.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;
  private user_avatar: String;

  constructor(public authService: AuthService, private router: Router) {

  	this.authService.afAuth.authState.subscribe((user: firebase.User) => {
        if (user == null) {
          console.log("Logged out");
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.user_email = '';
          this.user_avatar = '';
          this.router.navigate(['login']);
        } else {
          this.isLoggedIn = true;
          this.user_displayName = user.displayName;
          this.user_email = user.email;
          this.user_avatar = user.photoURL;
          console.log("Logged in");
          console.log(user);
          this.router.navigate(['']);
        }
    });
  }
}
