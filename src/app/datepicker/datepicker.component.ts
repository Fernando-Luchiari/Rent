import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSearch(form: NgForm) {
    const dateFrom = form.value.dateInput[0];
    const dateUntil = form.value.dateInput[1];
    const fromFormat = moment(dateFrom).format('YYYYMMDD');
    const untilFormat = moment(dateUntil).format('YYYYMMDD');

    localStorage.setItem('from', fromFormat);
    localStorage.setItem('until', untilFormat);

    this.userService.getCars(fromFormat, untilFormat).subscribe(res => this.userService.selectedCars.next(res));
  }

}
