import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Time } from '@angular/common';

const AUTH_API = '/api/'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
};

@Injectable()
export class AuthService {
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    private _isRegistered$ = new BehaviorSubject<boolean>(false);
    private _isCreated$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();
    isRegistered$ = this._isRegistered$.asObservable();
    isCreated$ = this._isCreated$.asObservable();
    API_URL = 'http://localhost:8080';
    TOKEN_KEY = 'token';
    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();

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
                this.currentUserSubject.next(response.user); // Store user data
                this._isLoggedIn$.next(true);
            })
        )
    }

    register(firstName: string, lastName: string, dateOfBirth: string, email: string, password: string) {
        return this.apiService.register(firstName, lastName, dateOfBirth, email, password).pipe(
            tap((response: any) => {
                this._isRegistered$.next(true);
            })
        )
    }

    getAccount() {
        return this.http.get(this.API_URL + '/account');
    }

    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }

    delete(email: string, password: string) {
        return this.apiService.deleteAccount(email, password).pipe(
            tap((response: any) => {
                localStorage.removeItem(response.token);
                this._isLoggedIn$.next(false);
            }) 
        )
    }
    createEvent(
        title: string,
        boysOnly: boolean,
        girlsOnly: boolean,
        twentyOne: boolean,
        capacity: number,
        description: string,
        startTime: string,
        endTime: string,
        activity: number,
        lat: number,
        lng: number,
        address: string,
        date: string,
      ) {
        const payload = {
          title: title,
          boysOnly: boysOnly,
          girlsOnly: girlsOnly,
          twentyOne: twentyOne,
          capacity: capacity,
          description: description,
          startTime: startTime,
          endTime: endTime,
          activity: activity,
          lat: lat,
          lng: lng,
          address: address,
          date: date,
        };
      
        return this.apiService.createEvent(payload.title, payload.boysOnly, payload.girlsOnly, payload.twentyOne, payload.capacity, payload.description, payload.startTime, payload.endTime, payload.activity, payload.lat, payload.lng, payload.address, payload.date).pipe(tap((response: any) => { 
            console.log(this.token); 
            localStorage.setItem('event_auth', response.token); 
            this._isCreated$.next(true); 
        }));
      }

      getUser(token: string)  {
        return this.apiService.getUser(token).pipe(
            tap((response: any) => {})
        )
      }
}