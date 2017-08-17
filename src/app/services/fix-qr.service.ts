import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';
import { IGenericResponse } from '../interfaces/IGenericResponse';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FixQrService {

  constructor(
    private _http: Http,
    private _serviceRoutes: ServicesRoutes
  ) { }

  fix(): Observable<IGenericResponse> {
    return this._http.post(this._serviceRoutes._('User', 'makeQR'), {})
      .map((response: Response) => response.json())
      .catch(err => Observable.throw(err.json().error || 'Server Error'))
      ;
  }

}
