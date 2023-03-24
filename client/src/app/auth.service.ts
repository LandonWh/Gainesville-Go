import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs';

const AUTH_API = '/api/'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
};

@Injectable()
export class AuthService {

    API_URL = 'http://localhost:8080';
    TOKEN_KEY = 'token';

    constructor(private http: HttpClient, private router: Router) {
        
     }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigateByUrl('/');
    }
    
    login(email: string, password: string) {
        
        const payload = {
            email,
            password
        };
        
        console.log("Request payload:", payload);
        console.log("Request headers:", httpOptions.headers);
    
        return this.http.post(AUTH_API + 'login', payload, httpOptions);
        // const data = {
        //     email: email,
        //     password: pass
        // };

        // this.http.post(this.API_URL + '/api/login', data, headers).subscribe(
        //     (res: any) => {
        //         localStorage.setItem(this.TOKEN_KEY, res.token);

        //         this.router.navigateByUrl('/home');
        //     }
        // );
    }

    getAccount() {
        return this.http.get(this.API_URL + '/account');
    }
}