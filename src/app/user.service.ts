import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string){
    const authData = {email: email, password: password};
    return this.http.post('http://localhost:3000/api/user/signup', authData);
  }
}
