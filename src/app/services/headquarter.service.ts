import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';
import { IHeadquarterFilter } from '../interfaces/IFilter';
import { IHeadquarterResponse, IHeadquarter } from '../interfaces/IHeadquarter';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HeadquarterService {

  constructor(
    private _http: Http,
    private _serviceRoutes: ServicesRoutes
  ) { }

  save(item: IHeadquarter): Observable<IHeadquarter> {
    return this._http.post(this._serviceRoutes._('Ngheadquarters', 'save'), JSON.stringify(item))
      .map((response: Response) => response.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error'))
      ;
  }

  /**
   * Get all headquarters
   *
   * @returns {Observable<IHeadquarterResponse[]>}
   * @memberof HeadquarterService
   */
  getAll(filter: IHeadquarterFilter): Observable<IHeadquarterResponse> {
    const body: any = JSON.stringify(filter);
    return this._http.post(this._serviceRoutes._('Ngheadquarters', 'getAll'), body)
      .map((response: Response) => response.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error'))
      ;
  }
}
