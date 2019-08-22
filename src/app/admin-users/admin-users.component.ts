import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { PeriodicElement } from '../manage-reservations/manage-reservations.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns: string[] = ['email', 'isadmin', 'edit'];
  dataSource = new MatTableDataSource();
  users: any;

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;

  constructor( private adminService: AdminService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(res => {
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
      this.adminService.deleteUser(id).subscribe(res => {
      console.log(res);
      this.getUsers();
    });
  }

  onAdmin(id: any) {
    console.log(id);
  }

}
