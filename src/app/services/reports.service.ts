import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IReportFilter } from '../interfaces/IFilter';
import { Observable } from 'rxjs/Rx';
import { IReportResponse } from '../interfaces/IReport';
import { ServicesRoutes } from '../classes/ServicesRoutes';

@Injectable()
export class ReportsService {

  constructor(
    private _http: Http,
    private _serviceRoutes: ServicesRoutes
  ) { }


  get(filter: IReportFilter): Observable<IReportResponse> {
    return this._http.post(this._serviceRoutes._('Ngreports', 'getAll'), JSON.stringify(filter))
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'))
      ;
  }
}
