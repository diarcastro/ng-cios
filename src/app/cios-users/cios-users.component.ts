import {
  Component
  // , ViewEncapsulation
  , OnInit
  , OnDestroy
} from '@angular/core';

import { PageEvent } from '@angular/material';

import { UserService } from '../services/user.service';
import { IUserActiveResponse, IUserActive, IUserNote } from '../interfaces/IUserActive';
import { IPagination } from '../interfaces/IPagination';
import { IUsersActiveFilter } from '../interfaces/IFilter';
import { IUser, IUserResponse } from '../interfaces/IUser';

import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { UserNoteService } from '../services/user-note.service';
import { IGenericResponse } from '../interfaces/IGenericResponse';
import { IHeadquarter } from '../interfaces/IHeadquarter';

@Component({
  selector: 'app-cios-users',
  templateUrl: './cios-users.component.html',
  styleUrls: ['./cios-users.component.scss']
  // , encapsulation: ViewEncapsulation.None
})

export class CiosUsersComponent implements OnInit, OnDestroy {

  public loggedUser: IUser;
  public users: IUserActive[];
  public pagination: IPagination;
  public loadingUsers: boolean;
  public pageSizeOptions: number[] = [6, 12, 18, 51];
  public pageEvent: PageEvent;
  public headquarters: IHeadquarter[];
  FILTER_KEY = 'users-active-filter';


  public filter: IUsersActiveFilter;

  private _getAll$: Subscription;
  private _get$: Subscription;
  private _refreshUsers$: Subscription;

  constructor(
    private _userService: UserService,
    private _userNoteService: UserNoteService
  ) {
    this.users = [];
    this.loadingUsers = true;
    this.filter = { search: '' };
  }

  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.filter.pagination.pagesCurrent = this.pageEvent.pageIndex;
    this.filter.pagination.limit = this.pageEvent.pageSize;
    this.searchUsers();
  }

  filteredUsers(): IUserActive[] {
    if (this.filter.search === '' && !this.filter.headquarter) {
      return this.users;
    } else {
      return this.users.filter((user: IUserActive) => {
        const lower: string = this.filter.search ? this.filter.search.toLocaleLowerCase() : '';
        let valid = true;

        if (lower !== '') {
          valid = (user.name.toLocaleLowerCase().indexOf(lower) > -1)
            || (user.headquarter_name && user.headquarter_name.toLocaleLowerCase().indexOf(lower) > -1);
        }

        if (this.filter.headquarter) {
          valid = valid && this.filter.headquarter && +this.filter.headquarter === +user.headquarter_id;
        }

        return valid ? user : false;
      });
    }
  }

  /**
   *
   *
   * @returns {boolean}
   * @memberof CiosUsersComponent
   * @deprecated
   */
  someUsersInside(): boolean {
    return true;
  }

  checkOutAll() {
    if (!this.loggedUser.permissions.checkoutbatch) {
      return;
    }
    swal({
      title: 'Confirmación'
      , text: 'Realmente desea sacar a todos los estudiantes de la sede ' + this.loggedUser.headquarter.name + '?'
      , type: 'question'
      , showCancelButton: true
    }).then(() => this._checkOutAllConfirmed(), () => { });

  }

  private _checkOutAllConfirmed() {
    this.loadingUsers = true;
    this._userService.checkOutAll().subscribe((response: object) => {
      this.loadingUsers = false;
      this.searchUsers();
    }, error => {
      this.loadingUsers = false;
    });
  }

  searchUsers() {
    this.loadingUsers = true;
    this.users = [];
    this._getAll$ = this._userService.getAll(this.filter).subscribe((response: IUserActiveResponse) => {
      this.loadingUsers = false;
      this.filter = response.filter;
      this.users = response.users;
      localStorage.setItem(this.FILTER_KEY, JSON.stringify(this.filter));
    });
  }

  onUserUpdated(user: IUserActive) {
    this._userService.refreshUser(user);
  }

  /**
   * Refresh User event
   *
   * @private
   * @param {IUserActive} user
   * @memberof CiosUsersComponent
   */
  private _onRefreshUser(user: IUserActive) {
    const updatedUsers: IUserActive[] = this.users.filter((usr: IUserActive) => usr.id === user.id)
    if (updatedUsers.length) {
      const updatedUser: IUserActive = updatedUsers[0];
      for (const i in user) {
        if (user.hasOwnProperty(i)) {
          updatedUser[i] = user[i];
        }
      }
    } else {
      this.searchUsers();
    }
  }

  ngOnInit() {
    const savedFilters = <IUsersActiveFilter>(JSON.parse(localStorage.getItem(this.FILTER_KEY)));
    this.filter = savedFilters || this.filter;
    this.searchUsers();

    this._get$ = this._userService.get().subscribe((response: IUserResponse) => {
      this.loggedUser = response.user;
      this.headquarters = response.headquarters;
    });

    this._refreshUsers$ = this._userService.getRefreshUser().subscribe((user: IUserActive) => this._onRefreshUser(user));

  }

  ngOnDestroy() {
    this._get$.unsubscribe();
    this._getAll$.unsubscribe();
    this._refreshUsers$.unsubscribe();
  }

}
