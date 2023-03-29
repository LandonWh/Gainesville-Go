import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}

  user: any;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
  }
}
