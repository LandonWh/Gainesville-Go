import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { RegisterService } from './register/register.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private registerService: RegisterService,
        private authService: AuthService
    ) {}

    canActivate() {
        let isAuthenticated = this.authService.isAuthenticated;
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }
        console.log(isAuthenticated);
        return isAuthenticated;
        //  if (!this.authService.isAuthenticated()) {
        //     this.router.navigate(['/login']);
        //     return false;
        // }
        //  else {
        //     return true;
        //  }
    }
}