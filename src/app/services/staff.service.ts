import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';
import { IStaffFilter } from '../interfaces/IFilter';
import { Observable } from 'rxjs/Rx';
import { IStaff, IStaffResponse } from '../interfaces/IStaff';

@Injectable()
export class StaffService {
  _SERVER_CONTROLLER = 'Ngstaff';

  constructor(
    private _http: Http
    , private _serviceRoutes: ServicesRoutes
  ) { }

  private _action(action: string): string {
    return this._serviceRoutes._(this._SERVER_CONTROLLER, action);
  }

  save(item: IStaff): Observable<IStaff> {
    return this._http.post(this._action('save'), JSON.stringify(item))
      .map((response: Response) => response.json())
      .catch(err => Observable.throw(err.json().error || 'Server error'))
      ;
  }

  getAll(filter: IStaffFilter): Observable<IStaffResponse> {
    return this._http.post(this._action('getAll'), JSON.stringify(filter))
      .map((response: Response) => response.json())
      .catch(err => Observable.throw(err.json().error || 'Server error'))
      ;
  }

}
