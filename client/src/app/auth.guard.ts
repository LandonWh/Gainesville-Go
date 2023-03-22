// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { RegisterService } from './register/register.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private registerService: RegisterService
//     ) {}

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         const user = this.registerService.
//         if (user) {
//             // authorised so return true
//             return true;
//         }

//         // not logged in so redirect to login page with the return url
//         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//         return false;
//     }
// }