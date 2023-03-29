import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router, public tokenStorage: TokenStorageService) {}

  user: any;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  getFirstName(token: string): string {
    
    const tokenInfo = this.getDecodedAccessToken(token);
    this.firstName = tokenInfo.firstName;
    console.log(this.firstName);
    return this.firstName;
  }

  getLastName(token: string): string {
    const tokenInfo = this.getDecodedAccessToken(token);
    this.lastName = tokenInfo.lastName;
    return this.lastName;
  }

  getEmail(token: string): string {
    const tokenInfo = this.getDecodedAccessToken(token);
    this.email = tokenInfo.email;
    return this.email;
  }

  getPassword(token: string): string {
    const tokenInfo = this.getDecodedAccessToken(token);
    this.password = tokenInfo.password;
    return this.password;
  }
}
