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
        console.log(email);
        console.log(password);
        return this.http.post('api/deleteuser', {email, password});
    }

    register(firstName: string, lastName: string, dateOfBirth: string, email: string, password: string) {
        return this.http.post('api/register', {firstName, lastName, dateOfBirth, email, password});
    }

    createEvent(
        eventName: string, 
        boys: boolean, 
        girls: boolean, 
        twentyOne: boolean, 
        numPeople: number, 
        date: string, 
        description: string, 
        startTime: Time,
        endTime: Time,
        activityLevel: number,
        latitude: string,
        longitude: string,
        address: string,
    ) {
        return this.http.post('api/event', {eventName, boys, girls, twentyOne, numPeople, date, description, startTime, endTime, activityLevel, latitude, longitude, address});
    }
}