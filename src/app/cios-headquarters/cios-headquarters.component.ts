import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { HeadquarterService } from '../services/headquarter.service';
import { IHeadquarterFilter } from '../interfaces/IFilter';
import { Subscription } from 'rxjs/Subscription';
import { IHeadquarter, IHeadquarterResponse } from '../interfaces/IHeadquarter';
import { IUser, IUserResponse } from '../interfaces/IUser';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-cios-headquarters',
  templateUrl: './cios-headquarters.component.html',
  styleUrls: ['./cios-headquarters.component.scss']
})
export class CiosHeadquartersComponent implements OnInit, OnDestroy {

  public filter: IHeadquarterFilter;
  public items: IHeadquarter[];
  public loadingData = false;
  public loggedUser: IUser;
  public pageSizeOptions: number[] = [2, 6, 12, 18, 51];
  public pageEvent: PageEvent;

  private _getAll$: Subscription;
  private _getUser$: Subscription;

  FILTER_KEY = 'headquarters-filter';


  constructor(
    private _userService: UserService,
    private _headquarterService: HeadquarterService
  ) {
    this.filter = { search: '' };
    this.items = [];
  }

  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.filter.pagination.pagesCurrent = this.pageEvent.pageIndex;
    this.filter.pagination.limit = this.pageEvent.pageSize;
    this.search();
  }

  onItemRemoved(item: IHeadquarter) {
    const index = this.items.indexOf(item);
    if (index) {
      this.items.splice(index, 1);
    }
  }

  search() {
    this.loadingData = true;
    this.items = [];
    this._getAll$ = this._headquarterService.getAll(this.filter)
      .subscribe((response: IHeadquarterResponse) => {
        this.loadingData = false;
        this.items = response.headquarters;
        this.filter = response.filter;
        localStorage.setItem(this.FILTER_KEY, JSON.stringify(this.filter));
      }, err => {
        this.loadingData = false;
      });
  }


  ngOnInit() {
    this.filter = <IHeadquarterFilter>(JSON.parse(localStorage.getItem(this.FILTER_KEY)) || {});
    this.search();

    this._getUser$ = this._userService.get().subscribe((response: IUserResponse) => {
      this.loggedUser = response.user;
    });

  }

  ngOnDestroy() {
    this._getAll$.unsubscribe();
    this._getUser$.unsubscribe();
  }

}
