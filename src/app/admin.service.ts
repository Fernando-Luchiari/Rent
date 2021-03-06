import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Injectable()
export class AdminService {

    constructor(private http: HttpClient) {}

    createCar(brand: string, model: string, power: string, seats: number, imgUrl: string) {
        const carData = {brand: brand, model: model, power: power, seats: seats, imgUrl: imgUrl};
        return this.http.post('http://localhost:3000/api/admin/create-car', carData);
    }

    getUsers() {
        return this.http.get('http://localhost:3000/api/admin/users');
    }

    deleteUser(id: any) {
        return this.http.delete('http://localhost:3000/api/admin/user/' + id);
    }

    adminUser(id: any) {
        const data = {id: id};
        return this.http.post('http://localhost:3000/api/admin/admin-user', data);
    }

    rentedCar() {
        return this.http.get('http://localhost:3000/api/admin/rented-cars');
    }

    cancelReservation(id: any) {
        return this.http.delete('http://localhost:3000/api/admin/cancel-reservation' + id);
    }
}
