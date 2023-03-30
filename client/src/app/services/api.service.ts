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
        return this.http.post('api/delete', {email, password});
    }
}