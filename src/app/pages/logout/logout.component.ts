import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private fireauth: FirebaseauthService, private router: Router) { }

  public user: firebase.User;

  ngOnInit(): void {
  }

  logout() {
    this.fireauth.logout();
    this.router.navigate(['/public'])
  }

}
