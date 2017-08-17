import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser, IUserResponse } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { FixQrService } from '../services/fix-qr.service';
import { IGenericResponse } from '../interfaces/IGenericResponse';

@Component({
  selector: 'app-cios-fix-qr',
  templateUrl: './cios-fix-qr.component.html',
  styleUrls: ['./cios-fix-qr.component.scss']
})
export class CiosFixQrComponent implements OnInit, OnDestroy {

  user: IUser;
  fix = 0;
  saving = false;

  private _user$: Subscription;
  private _fix$: Subscription;

  constructor(
    private _userService: UserService,
    private _fixQrService: FixQrService
  ) { }

  fixUsers() {
    this.saving = true;
    this._fix$ = this._fixQrService.fix().subscribe((response: IGenericResponse) => {
      this.saving = false;
      this.fix = 0;
      this._userService.userResponse$.next({ user: this.user, fix: this.fix });
    }, () => this.saving = false);
  }

  ngOnInit() {
    this._user$ = this._userService.get().subscribe((response: IUserResponse) => {
      this.user = response.user;
      this.fix = response.fix;
    });
  }

  ngOnDestroy() {
    if (this._user$) {
      this._user$.unsubscribe();
    }
    if (this._fix$) {
      this._fix$.unsubscribe();
    }
  }

}
