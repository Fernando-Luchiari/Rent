import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AdminService } from '../admin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css']
})
export class ManageReservationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['car_id', 'reserved_from', 'reserved_till', 'cancel'];
  dataSource = new MatTableDataSource();
  carsRented: any;
  unsubscribe= new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private adminService: AdminService) { }

  ngOnInit() {
    this.getReservations();

  }
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  getReservations(){
    this.adminService.rentedCar().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      const ELEMENT_DATA = [];
      this.carsRented = res;
      this.carsRented.forEach(carRented => {
        const car_id = carRented.car_id;
        const fromDate = carRented.fromDate;
        const untilDate = carRented.untilDate;
        const id = carRented._id;
        ELEMENT_DATA.push({id: id, car_id: car_id, reserved_from: fromDate, reserved_till: untilDate});
      });
      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
  });
  }

  onCancel(id: any){
    this.adminService.cancelReservation(id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
      this.getReservations();
    });
  }

}

