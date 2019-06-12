import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.css']
})
export class ManageReservationsComponent implements OnInit {

  displayedColumns: string[] = ['car_id', 'reserved_from', 'reserved_till', 'cancel'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  car_id: number;
  reserved_from: string;
    reserved_till: number;
    cancel: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
  {car_id: 1, reserved_from: 'Hydrogen', reserved_till: 1.0079, cancel: 'H'},
  {car_id: 2, reserved_from: 'Helium', reserved_till: 4.0026, cancel: 'He'},
  {car_id: 3, reserved_from: 'Lithium', reserved_till: 6.941, cancel: 'Li'},
  {car_id: 4, reserved_from: 'Beryllium', reserved_till: 9.0122, cancel: 'Be'},
  {car_id: 5, reserved_from: 'Boron', reserved_till: 10.811, cancel: 'B'},
  {car_id: 6, reserved_from: 'Carbon', reserved_till: 12.0107, cancel: 'C'},
  {car_id: 7, reserved_from: 'Nitrogen', reserved_till: 14.0067, cancel: 'N'},
  {car_id: 8, reserved_from: 'Oxygen', reserved_till: 15.9994, cancel: 'O'},
  {car_id: 9, reserved_from: 'Fluorine', reserved_till: 18.9984, cancel: 'F'},
  {car_id: 10, reserved_from: 'Neon', reserved_till: 20.1797, cancel: 'Ne'},
  {car_id: 11, reserved_from: 'Sodium', reserved_till: 22.9897, cancel: 'Na'},
  {car_id: 12, reserved_from: 'Magnesium', reserved_till: 24.305, cancel: 'Mg'},
  {car_id: 13, reserved_from: 'Aluminum', reserved_till: 26.9815, cancel: 'Al'},
  {car_id: 14, reserved_from: 'Silicon', reserved_till: 28.0855, cancel: 'Si'},
  {car_id: 15, reserved_from: 'Phosphorus', reserved_till: 30.9738, cancel: 'P'},
  {car_id: 16, reserved_from: 'Sulfur', reserved_till: 32.065, cancel: 'S'},
  {car_id: 17, reserved_from: 'Chlorine', reserved_till: 35.453, cancel: 'Cl'},
  {car_id: 18, reserved_from: 'Argon', reserved_till: 39.948, cancel: 'Ar'},
  {car_id: 19, reserved_from: 'Potassium', reserved_till: 39.0983, cancel: 'K'},
  {car_id: 20, reserved_from: 'Calcium', reserved_till: 40.078, cancel: 'Ca'},
];


