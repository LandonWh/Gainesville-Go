import { Time } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    constructor(private http: HttpClient) {

    }

    login(email: string, password: string) {
        return this.http.post('api/login', {email, password});
    }

    deleteAccount(email: string, password: string) {
        return this.http.post('api/deleteuser', {email, password});
    }

    register(firstName: string, lastName: string, dateOfBirth: string, email: string, password: string) {
        return this.http.post('api/register', {firstName, lastName, dateOfBirth, email, password});
    }

    createEvent(
        title: string,
        boysOnly: boolean,
        girlsOnly: boolean,
        twentyOne: boolean,
        capacity: number,
        description: string,
        //startTime: string,
        //endTime: string,
        activity: number,
        lat: number,
        lng: number,
        address: string
        //date: string,
    ) {
        return this.http.post('api/event', { title, boysOnly, girlsOnly, twentyOne, capacity, description, activity, address, lat, lng });
    }
}