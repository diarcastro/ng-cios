import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';
import { Observable } from 'rxjs/Rx';
import { IGenericResponse } from '../interfaces/IGenericResponse';

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
