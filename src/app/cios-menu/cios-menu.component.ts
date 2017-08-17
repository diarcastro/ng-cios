import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser, IUserResponse } from '../interfaces/IUser';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'cios-menu',
  templateUrl: './cios-menu.component.html',
  styleUrls: ['./cios-menu.component.scss']
})
export class CiosMenuComponent implements OnInit, OnDestroy {

  user: IUser;
  fix: number;

  private _getUser$: Subscription;
  private _getResponse$: Subscription;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._getResponse$ = this._userService.userResponse$.asObservable().subscribe((response: IUserResponse) => {
      this.fix = response.fix;
    });

    this._getUser$ = this._userService.get().subscribe((response: IUserResponse) => {
      this.user = response.user;
      this.fix = +response.fix;
    })
  }

  ngOnDestroy() {
    if (this._getUser$) {
      this._getUser$.unsubscribe();
    }
    if (this._getResponse$) {
      this._getResponse$.unsubscribe();
    }
  }

}
