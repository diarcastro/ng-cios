import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { HeadquarterService } from '../services/headquarter.service';
import { IHeadquarterFilter } from '../interfaces/IFilter';
import { Subscription } from 'rxjs/Subscription';
import { IHeadquarter, IHeadquarterResponse } from '../interfaces/IHeadquarter';
import { IUser, IUserResponse } from '../interfaces/IUser';
import { PageEvent } from '@angular/material';
import { IState } from '../interfaces/IStates';
import swal from 'sweetalert2';

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

  public newHeadquarter: IHeadquarter;



  private _getAll$: Subscription;
  private _getUser$: Subscription;
  private _states: IState[] = [
    { value: 1, name: 'Publicado' }
    , { value: 0, name: 'Despublicado' }

  ];

  FILTER_KEY = 'headquarters-filter';


  constructor(
    private _userService: UserService,
    private _headquarterService: HeadquarterService
  ) {
    this.newHeadquarter = { name: '' };
    this.filter = { search: '' };
    this.items = [];
  }

  save() {
    if (!this.newHeadquarter.name) {
      swal({
        title: 'Error'
        , text: 'Debe digitar un nombre para la nueva sede'
        , type: 'error'
        , timer: 6000
      });

      return false;
    }

    const newHq: IHeadquarter = Object.assign({}, this.newHeadquarter);
    newHq.state = 1;
    this.items.splice(0, 0, newHq);
    this._headquarterService.save(this.newHeadquarter).subscribe((response: IHeadquarter) => {
      for (const i in response) {
        if (response.hasOwnProperty(i)) {
          newHq[i] = response[i];
        }
      }
    });
    this.newHeadquarter.name = '';
  }

  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.filter.pagination.pagesCurrent = this.pageEvent.pageIndex;
    this.filter.pagination.limit = this.pageEvent.pageSize;
    this.search();
  }

  onItemRemoved(item: IHeadquarter) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
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

  getItems(): IHeadquarter[] {

    if (!this.filter.search && this.filter.state === '') {
      return this.items;
    }

    const search: string = this.filter.search.toLowerCase();

    return this.items.filter((item: IHeadquarter) => {
      let valid: boolean = item.name.toLowerCase().indexOf(search) > -1;
      if (this.filter.state !== '') {
        valid = valid || +item.state === this.filter.state;
      }
      return valid;
    });
  }

  getStates(): IState[] {
    return this._states;
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
