import { Component, OnInit, OnDestroy } from '@angular/core';
import { IStaffFilter, IHeadquarterFilter } from '../interfaces/IFilter';
import { IStaff, IStaffResponse } from '../interfaces/IStaff';
import { Subscription } from 'rxjs/Subscription';
import { StaffService } from '../services/staff.service';
import { UserService } from '../services/user.service';
import { IUserResponse, IUser } from '../interfaces/IUser';
import { PageEvent } from '@angular/material';
import { HeadquarterService } from '../services/headquarter.service';
import { IPagination } from '../interfaces/IPagination';
import { IHeadquarterResponse, IHeadquarter } from '../interfaces/IHeadquarter';

@Component({
  selector: 'app-cios-staff',
  templateUrl: './cios-staff.component.html',
  styleUrls: ['./cios-staff.component.scss']
})
export class CiosStaffComponent implements OnInit, OnDestroy {

  public filter: IStaffFilter;
  private _items: IStaff[];
  public headquarters: IHeadquarter[] = [];
  public loggedUser: IUser;
  public pageEvent: PageEvent;
  public pageSizeOptions: number[] = [6, 12, 18, 51];

  public loading = false;

  private _getAll$: Subscription;
  private _getUser$: Subscription;
  private _getHeadquarters$: Subscription;

  FILTER_KEY = 'staff-filter';

  constructor(
    private _staffService: StaffService,
    private _userService: UserService,
    private _headquarterService: HeadquarterService
  ) {

    this.filter = { search: '' };
  }

  getItems(): IStaff[] {
    if (!this._items) {
      return [];
    }
    if (!this.filter.search) {
      return this._items;
    } else {
      const search = this.filter.search.toLowerCase();
      return this._items.filter((i: IStaff) => {
        let valid = i.name.toLocaleLowerCase().indexOf(search) >= 0;

        if (i.username) {
          valid = valid || i.username.toLowerCase().indexOf(search) >= 0;
        }

        if (i.email) {
          valid = valid || i.email.toLowerCase().indexOf(search) >= 0;
        }

        if (i.headquarter_name) {
          valid = valid || i.headquarter_name.toLowerCase().indexOf(search) >= 0;
        }

        if (this.filter.headquarter_id !== '' && i.headquarter_id) {
          valid = valid || this.filter.headquarter_id === i.headquarter_id;
        }
        return valid;

      });
    }
  }

  search() {
    this._items = [];
    this.loading = true;
    this._getAll$ = this._staffService.getAll(this.filter).subscribe((response: IStaffResponse) => {
      this.loading = false;
      this._items = response.items;
      this.filter = response.filter;
      localStorage.setItem(this.FILTER_KEY, JSON.stringify(this.filter));
    }, () => this.loading = false);
  }

  getHeadquarters(): IHeadquarter[] {
    return this.headquarters;
  }

  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.filter.pagination.pagesCurrent = this.pageEvent.pageIndex;
    this.filter.pagination.limit = this.pageEvent.pageSize;
    this.search();
  }

  ngOnInit() {
    const savedFilters = <IStaffFilter>(JSON.parse(localStorage.getItem(this.FILTER_KEY)));
    this.filter = savedFilters || this.filter;
    this.search();

    this._getUser$ = this._userService.get().subscribe((userResponse: IUserResponse) => {
      this.loggedUser = userResponse.user;
    });

    const pagination: IPagination = {
      limitstart: 0,
      limit: 1000
    };

    const filter: IHeadquarterFilter = {
      state: 1,
      pagination: pagination
    };

    this._getHeadquarters$ = this._headquarterService.getAll(filter).subscribe((response: IHeadquarterResponse) => {
      this.headquarters = response.headquarters;
    });
  }

  ngOnDestroy() {
    this._getAll$.unsubscribe();
    this._getUser$.unsubscribe();
    this._getHeadquarters$.unsubscribe();
  }



}
