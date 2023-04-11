import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    public tokenStorage: TokenStorageService
  ) {}

  user: any;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    const token = this.tokenStorage.getToken();
    if (token != null) {
    this.userService.getUserByToken(token).subscribe(
      data => {
        console.log('User data:', data);
        this.user = data;
      },
      error => {
        console.log('Error:', error);
      }
    );
  }
}

  deleteAccount() {
    this.router.navigate(['/delete']);
  }
}


  // getFirstName(token: string): string {
    
  //   const tokenInfo = this.getDecodedAccessToken(token);
  //   this.firstName = tokenInfo.firstName;
  //   console.log(this.firstName);
  //   return this.firstName;
  // }

  // getLastName(token: string): string {
  //   const tokenInfo = this.getDecodedAccessToken(token);
  //   this.lastName = tokenInfo.lastName;
  //   return this.lastName;
  // }

  // getEmail(token: string): string {
  //   const tokenInfo = this.getDecodedAccessToken(token);
  //   this.email = tokenInfo.email;
  //   return this.email;
  // }

  // getPassword(token: string): string {
  //   const tokenInfo = this.getDecodedAccessToken(token);
  //   this.password = tokenInfo.password;
  //   return this.password;
  // }

  //deleteAccount() {
  //  this.router.navigate(['/delete']);
  //}
//}
