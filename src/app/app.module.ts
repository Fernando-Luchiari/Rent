import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {MatFormFieldModule, MatInputModule,
  MatCardModule, MatIcon, MatIconModule,
  MatToolbarModule, MatSidenavModule,  MatListModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule} from '@angular/material';

import { CreateCarComponent } from './create-car/create-car.component';
import { MainPageComponent } from './main-page/main-page.component';

import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CreateCarComponent,
    MainPageComponent,
    ManageReservationsComponent,
    DatepickerComponent,
    AdminUsersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'main', component: MainPageComponent},
      {path: 'create-car', component: CreateCarComponent},
      {path: 'manage', component: ManageReservationsComponent},
      {path: 'users', component: AdminUsersComponent}
    ])
  ],
  providers: [UserService, LoginComponent, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
