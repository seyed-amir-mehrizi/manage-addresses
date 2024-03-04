import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../model/model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = true;
  userInfo: UserInfo;
  constructor() {

  }

  ngOnInit(): void {
    this.checkIsLoggedIn();
  }


  checkIsLoggedIn() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo !== null) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  logout() {
    localStorage.clear();
    window.location.replace('/');
  }

}
