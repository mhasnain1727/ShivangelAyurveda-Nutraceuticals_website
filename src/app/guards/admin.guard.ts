import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('admin_logged_in');

    console.log('AdminGuard: isLoggedIn =', isLoggedIn);
    if (isLoggedIn === 'true') {
      return true;
    }

    this.router.navigate(['/admin-login']);
    return false;
  }
  
}
