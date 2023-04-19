import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { AccountService, Account } from '../services/account.service';

//import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  account: Account[] = [];
  firstName: string;
  lastName: string;
  email: string;
  token: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public tokenStorage: TokenStorageService,
    private accountService: AccountService
  ) {}

  user: any;

  // getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch(Error) {
  //     return null;
  //   }
  // }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.accountService.getAccount(this.token)
    .subscribe(
      response => {
        console.log("response again: " + response)
        
      },
    );
  }

  deleteAccount() {
    this.router.navigate(['/delete']);
  }

  // getFirstName(token: string) {
  //   const tokenInfo = this.getDecodedAccessToken(token);
  //   this.firstName = tokenInfo.firstName;
  //   console.log(this.firstName);
  // }

  // getLastName(token: string) {
  //   const tokenInfo = this.getDecodedAccessToken(token);
  //   this.lastName = tokenInfo.lastName;
  // }

  // getEmail(token: string) {
  //   const tokenInfo = this.getDecodedAccessToken(token);
  //   this.email = tokenInfo.email;
  // }
}

