import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit, OnDestroy {
  selectedFile: File = null;
  fd = new FormData();
  private unsubscribe = new Subject();

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/api/admin/save-image', this.fd).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        console.log(res);
    });
  }
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  onCreate(form: NgForm){
    let brand = form.value.brand;
    let model = form.value.brand;
    let power = form.value.power;
    let seats = form.value.seats;
    let imgUrl  = this.selectedFile.name;
    this.adminService.createCar(brand, model, power, seats, imgUrl).subscribe(res => {
      console.log(res);
    });
  }
}
