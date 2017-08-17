import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { IReportFilter } from '../interfaces/IFilter';
import { PageEvent } from '@angular/material';
import { IReport, IReportResponse } from '../interfaces/IReport';

import { IHeadquarter } from '../interfaces/IHeadquarter';
import { UserService } from '../services/user.service';
import { IUserResponse } from '../interfaces/IUser';
import { ServicesRoutes } from '../classes/ServicesRoutes';

@Component({
  selector: 'app-cios-reports',
  templateUrl: './cios-reports.component.html',
  styleUrls: ['./cios-reports.component.scss']
  , providers: [ReportsService]
})
export class CiosReportsComponent implements OnInit, OnDestroy {

  filter: IReportFilter;
  loading = false;
  headquarters: IHeadquarter[];

  pageEvent: PageEvent;

  pageSizeOptions: number[] = [20, 40, 80, 120];

  FILTER_KEY = 'reports-filter';

  private _items: IReport[];

  constructor(
    private _userService: UserService,
    private _reportsService: ReportsService,
    private _servicesRoutes: ServicesRoutes
  ) {
    this.filter = { search: '', headquarter_id: '', date_init: '', date_end: '', grouped: '' };
  }

  search() {
    this._items = [];
    this.loading = true;
    this._reportsService.get(this.filter).subscribe((response: IReportResponse) => {
      this.loading = false;
      this._items = response.items;
      this.filter = response.filter;
      localStorage.setItem(this.FILTER_KEY, JSON.stringify(this.filter));
    }, () => this.loading = false);

  }

  getItems() {
    return this._items;
  }

  resetFilters() {
    this.filter = {
      search: '', headquarter_id: '', date_init: '', date_end: '', grouped: '',
      pagination: {
        pagesStart: 0
        , pagesCurrent: 0
      }
    };
    this.search();
  }

  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.filter.pagination.pagesCurrent = this.pageEvent.pageIndex;
    this.filter.pagination.limit = this.pageEvent.pageSize;
    this.search();
  }

  getExportUrl() {
    let url: string = this._servicesRoutes._('Ngreports', 'export');
    for (const i in this.filter) {
      if (i !== 'pagination') {
        url += `&${i}=${encodeURIComponent(this.filter[i])}`;
      }
    }

    return url;
    // ./index.php?option=com_cios&task=Ngreports.export&search=
  }

  ngOnInit() {
    const savedFilters = <IReportFilter>(JSON.parse(localStorage.getItem(this.FILTER_KEY)));
    this.filter = savedFilters || this.filter;

    this.search();

    this._userService.get().subscribe((response: IUserResponse) => {
      this.headquarters = response.headquarters;
    });
  }

  ngOnDestroy() {
  }

}
