import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private fireauth: FirebaseauthService) { }

  public user: firebase.User;

  ngOnInit(): void {
    this.fireauth.user.subscribe(
      (originalUser: firebase.User) => {
        this.user = originalUser;
      }
    );
  }

  

}
