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
}
