import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  cars: any;
  path: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.selectedCars.subscribe(res => {
      this.cars = res;
      this.path =  this.userService.path;
    });
  }

  onRent(car) {
    const from = localStorage.getItem('from');
    const until = localStorage.getItem('until');

    const fromDate = moment(from).format('YYYY-MM-DD');
    const untilDate = moment(until).format('YYYY-MM-DD');
    this.userService.rentCar(car._id, from, until, fromDate, untilDate).subscribe(res => {
      console.log(res);
    });

  }

}
