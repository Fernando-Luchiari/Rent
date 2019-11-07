import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  tokenTimer: any;
  isAdmin = new Subject();
  authenticated = new BehaviorSubject(false);
  selectedCars = new Subject();
  path = 'http://localhost:3000/uploads/';

  constructor(private http: HttpClient, private router: Router) { }

  createUser(email: string, password: string){
    const authData = {email: email, password: password};
    return this.http.post('http://localhost:3000/api/user/signup', authData);
  }

  loginUser(email: string, password: string){
    const authData = {email: email, password: password};
    return this.http.post<{token: string, expiresIn: any, admin: any}>('http://localhost:3000/api/user/login', authData);
  }
  saveuserDate(token: string,expirationDate: Date,admin: any){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toString());
    localStorage.setItem('admin',admin);
  }
  setTimer(duration: any){
    this.tokenTimer = setTimeout(() => {this.logout()} , duration * 1000);
  }

  logout() {
    this.authenticated.next(false);
    localStorage.removeAll();
    this.changeAdmin(0);
    this.router.navigate(['']);
  }

  changeAdmin(active: any) {

  }

  getUserData(){
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const admin = localStorage.getItem('admin');

    if (!token || !expiration){
      return;
    }
    return {
      token: token,
      expiration: new Date(expiration),
      admin: admin
    }
  }

  getCars(from: any, until: any){
    const date = {from: from,until: until};
    return this.http.post('http://localhost:3000/api/admin/cars', date);
  }

  rentCar(id: any, until: any, from: any, fromDate: any, untilDate: any){
    const rentData={car_id: id, from: from, until: until, fromDate: fromDate, untilDate: untilDate};
    return this.http.post('http://localhost:3000/api/admin/rent', rentData);
  }

}
