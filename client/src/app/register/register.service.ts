import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Account {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  @Injectable ({
    providedIn: 'root'
  })

  export class RegisterService {
    private _accounts: Account[] = [{
      firstName: "John",
      lastName: "Smith",
      email: "Hello",
      password: "first password"
    }]

    constructor() {}

    /**
     * Adds a new account
     * @param account The account to add
     * @returns List of accounts
     */

    add(account: Account): Account[] {
        this._accounts.push(account);
        return this._accounts
    }

    //TODO: add a remove (delete) method

    get(): Account[] {
        return this._accounts;
    }

}