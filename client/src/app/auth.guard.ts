import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { RegisterService } from './register/register.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private registerService: RegisterService,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // let isAuthenticated = this.authService.isAuthenticated();
        // if (!isAuthenticated) {
        //     this.router.navigate(['/login']);
        // }
        // console.log(isAuthenticated);
        // return isAuthenticated;
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
        return false;
    }
}