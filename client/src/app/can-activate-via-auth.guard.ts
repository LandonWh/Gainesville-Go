import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {

    }

    canActivate() {
        return this.authService.isAuthenticated;
    }
}