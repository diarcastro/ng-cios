import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { IUser, IUserResponse } from '../interfaces/IUser';

@Injectable()
export class AuthGuard implements CanActivate {

  user: IUser;

  constructor(
    private userService: UserService
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.userService.get().map((response: IUserResponse) => {
      // console.log(state.url, response.user.permissions);
      switch (state.url) {
        case '/':
          return response.user.permissions.create ? true : false;
        case '/personal':
          return response.user.permissions.staff ? true : false;
        case '/sedes':
          return response.user.permissions.headquarter ? true : false;
        case '/reportes':
          return response.user.permissions.reports ? true : false;
        case '/fix':
          return response.user.permissions.qr_fix ? true : false;
      }
    });

  }
}
