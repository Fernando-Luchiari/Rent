import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  unsubscribe = new Subject();

  constructor(private userservice: UserService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.unsubscribe.unsubscribe();
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    this.userservice.createUser(email, pass).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
    });
  }

}
