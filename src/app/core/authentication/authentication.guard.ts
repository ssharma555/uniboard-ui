import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { Logger } from '../logger.service';
import { CredentialsService } from './credentials.service';
import { ApiService } from '@app/services/api.service';
import { UserService } from '@app/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('code', route.queryParams.id);
    var userId = route.queryParams.id;
    if (userId && !this.credentialsService.isAuthenticated()) {
      return this.apiService.getUserDetails(userId).pipe(
        map((result: any) => {
          console.log('User = ', result);
          if (result) {
            this.userService.storeUser(result);
            this.apiService.activateUser(userId).subscribe();
            return true;
          } else {
            if (!this.credentialsService.isAuthenticated()) {
              console.log('navigating to login');
              this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
              return false;
            }
            console.log('authenticated');
            return true;
          }
        })
      );
    } else {
      if (!this.credentialsService.isAuthenticated()) {
        console.log('navigating to login');
        this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
        return false;
      }

      console.log('authenticated');
      return true;
    }
  }
}
