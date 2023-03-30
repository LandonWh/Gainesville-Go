import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';
import { ApiService } from './api.service';

const AUTH_API = '/api/'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
};

@Injectable()
export class AuthService {
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();
    API_URL = 'http://localhost:8080';
    TOKEN_KEY = 'token';

    constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
        const token = localStorage.getItem('account_auth');
        this._isLoggedIn$.next(!!token);
     }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        this._isLoggedIn$.next(false);
        this.router.navigateByUrl('/');
    }
    
    login(email: string, password: string) {
        
        return this.apiService.login(email, password).pipe(
            tap((response: any) => {
                localStorage.setItem('account_auth', response.token);
                this._isLoggedIn$.next(true);
            })
        )
    }

    getAccount() {
        return this.http.get(this.API_URL + '/account');
    }

    delete(email: string, password: string) {
        return this.apiService.deleteAccount(email, password).pipe(
            tap((response: any) => {
                localStorage.removeItem(response.token);
                this._isLoggedIn$.next(false);
            }) 
        )
    }
}