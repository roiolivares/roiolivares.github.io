import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { take } from 'rxjs/operators';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirebasedbService } from 'src/app/services/firebasedb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fireauth: FirebaseauthService, private firestore: FirebasedbService, private router: Router) { }

  public user: firebase.User;

  public loginError: boolean = false;
  public allowedUserError: boolean = false;

  ngOnInit(): void {
    this.fireauth.user.subscribe(
      (originalUser: firebase.User) => {
        this.user = originalUser;
        console.log(this.user);
      }
    )
  }

  login() {
    this.fireauth.login().then(
      (user: firebase.auth.UserCredential) => {
        // LOGIN CORRECTE
        let email = user.user.email;
        this.firestore.chechAllowedUser(email).pipe(take(1)).subscribe(
          (originalEmails: any[]) => {
            if (originalEmails.length == 1) {
              // Correcte
              this.loginError = false;
              this.allowedUserError = false;
              this.router.navigate(['/home']);
            } else {
              // Error al login
              this.loginError = true;
              this.allowedUserError = true;
              this.fireauth.logout();
            }
          }
        );
      }
    ).catch(
      (error: any) => {
        // LOGIN INCORRECTE

      }  
    )
  }
}
