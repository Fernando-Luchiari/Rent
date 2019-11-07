import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatTableDataSource, MatPaginator, MatTable } from '@angular/material';

import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['email', 'isadmin', 'edit'];
  dataSource = new MatTableDataSource();
  users: any;
  unsubscribe = new Subject();

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;

  constructor( private adminService: AdminService) { }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  getUsers() {
    this.adminService.getUsers().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      const ELEMENT_DATA = [];
      this.users = res;
      this.users.forEach(user => {
        const email = user.email;
        const isAdmin = user.isAdmin;
        const id = user._id;
        ELEMENT_DATA.push({email: email,isAdmin: isAdmin,id: id});
      });
      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
  });
  }

  onDelete(id: any) {
    this.adminService.deleteUser(id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
      this.getUsers();
    });
  }

  onAdmin(id: any) {
    this.adminService.adminUser(id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log(res);
      this.getUsers();
    });
  }

}
