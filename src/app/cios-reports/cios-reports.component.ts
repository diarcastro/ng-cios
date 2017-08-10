import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { IReportFilter } from '../interfaces/IFilter';
import { PageEvent } from '@angular/material';
import { IReport, IReportResponse } from '../interfaces/IReport';
import { Subscription } from 'rxjs/Subscription';

import { DataSource } from '@angular/cdk';
import { IHeadquarter } from '../interfaces/IHeadquarter';
import { UserService } from '../services/user.service';
import { IUserResponse } from '../interfaces/IUser';

@Component({
  selector: 'app-cios-reports',
  templateUrl: './cios-reports.component.html',
  styleUrls: ['./cios-reports.component.scss']
})
export class CiosReportsComponent implements OnInit, OnDestroy {

  filter: IReportFilter;
  loading = false;
  headquarters: IHeadquarter[];

  pageEvent: PageEvent;

  pageSizeOptions: number[] = [20, 40, 80, 120];

  FILTER_KEY = 'reports-filter';

  private _items: IReport[];
  private _getAll$: Subscription;
  private _getUser$: Subscription;

  constructor(
    private _userService: UserService,
    private _reportsService: ReportsService
  ) {
    this.filter = { search: '' };
  }

  search() {
    this._items = [];
    this.loading = true;
    this._getAll$ = this._reportsService.get(this.filter).subscribe((response: IReportResponse) => {
      this.loading = false;
      this._items = response.items;
      this.filter = response.filter;
      localStorage.setItem(this.FILTER_KEY, JSON.stringify(this.filter));
    }, () => this.loading = false);

  }

  getItems() {
    return this._items;
  }

  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.filter.pagination.pagesCurrent = this.pageEvent.pageIndex;
    this.filter.pagination.limit = this.pageEvent.pageSize;
    this.search();
  }

  ngOnInit() {
    this.filter = <IReportFilter>(JSON.parse(localStorage.getItem(this.FILTER_KEY)));
    this.search();

    this._getUser$ = this._userService.get().subscribe((response: IUserResponse) => {
      this.headquarters = response.headquarters;
    });
  }

  ngOnDestroy() {
    this._getAll$.unsubscribe();
  }

}
