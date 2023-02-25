//Main structure from https://github.com/cornflourblue/angular-10-registration-login-example/blob/master/src/app/_services/account.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { User } from "../_models/user";
import { Router } from "@angular/router";

  @Injectable ({
    providedIn: 'root'
  })

  export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>

    constructor(
      private router: Router,
      private http: HttpClient
    ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
      this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
      return this.userSubject.value;
    }

    login(email: string, password: string) {
      return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, {email, password})
      .pipe(map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
      }));
    }

    logout() {
      localStorage.removeItem('user');
      this.userSubject.next(null as any);
      this.router.navigate(['/account/login']);
    }

    register(user: User)  {
        return this.http.post(`${environment.apiUrl}/users/register`, user)
    }

    delete(id: string) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      }))
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
      return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    
    update(id: string, params: any) {
      return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        //Updates stored info if the user updates their profile info
        if (id == this.userValue.id) {
          //Update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          //Publish upated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }))
    }

}