import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  { 
  token: any;
  constructor(
    private userservice: UserService,
    private router: Router) { }


  onLogin(form: NgForm) {
    let email = form.value.email;
    let pass = form.value.password;

    this.userservice.loginUser(email, pass).subscribe(res => {
      this.userservice.authenticated.next(true);
      const admin = res.admin;
      const token = res.token;
      this.userservice.isAdmin.next(admin);
      const expires = res.expiresIn;
      if (token) {
        this.userservice.setTimer(expires);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expires * 1000);
        this.userservice.saveuserDate(token, expirationDate, admin);
        this.router.navigate(['/main']);
      }
    });
  }

  autoAuthUser() {
    const authInfo = this.userservice.getUserData();
    if (!authInfo){
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.userservice.authenticated.next(true);
    }
  }

}
