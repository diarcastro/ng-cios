import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable, Subject } from 'rxjs/Rx';

import { ServicesRoutes } from '../classes/ServicesRoutes';
import { IUser, IUserResponse } from '../interfaces/IUser';
import { IUserActive, IUserActiveResponse } from '../interfaces/IUserActive';
import { IUsersActiveFilter } from '../interfaces/IFilter';

@Injectable()
export class UserService {

  public userResponse: IUserResponse;
  public userResponse$: Subject<IUserResponse>;

  private _refreshUser = new Subject<IUserActive>();

  constructor(
    private http: Http,
    private servicesRoutes: ServicesRoutes
  ) {
    // this._refreshUser = new Subject<IUserActive>();
    // this.refreshUser$ = this._refreshUser.asObservable();
    this.load();
  }

  public getRefreshUser(): Observable<IUserActive> {
    return this._refreshUser.asObservable();
  }

  public refreshUser(user: IUserActive) {
    this._refreshUser.next(user);
  }
  /**
   * Get current logged User
   *
   * @memberof UserService
   */
  private load() {
    if (!this.userResponse$) {
      this.userResponse$ = new Subject<IUserResponse>()
      return this.http.get(this.servicesRoutes.userInfo())
        .map((response: Response) => response.json())
        .catch((err: any) => Observable.throw(err.json().error || 'Server error'))
        .subscribe((response: IUserResponse) => {
          this.userResponse = response;
          this.userResponse$.next(response)
        })
        ;
    }
  }

  get(): Observable<IUserResponse> {
    if (this.userResponse) {
      return new Observable<IUserResponse>(observer => {
        observer.next(this.userResponse);
      });
    } else {
      return this.userResponse$.asObservable();
    }
  }

  getOne(id: number): Observable<IUserActive> {
    return this.http.post(this.servicesRoutes.userOne(), JSON.stringify({ id: id }))
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  /**
   * Get all registered users
   *
   * @returns {Observable<IUserActiveResponse>}
   * @memberof UserService
   */
  getAll(params: IUsersActiveFilter): Observable<IUserActiveResponse> {
    const body: any = JSON.stringify(params);

    return this.http.post(this.servicesRoutes.users(), body)
      .map((response: Response) => response.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'))
      ;
  }

  checkIn(user: IUserActive): Observable<IUserActive> {
    return this.http.post(this.servicesRoutes.checkIn(), JSON.stringify({ id: user.id }))
      .map((response: Response) => response.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'))
      ;
  }

  checkOut(user: IUserActive): Observable<IUserActive> {
    if (user.headquarter_id !== this.userResponse.user.headquarter.id) {
      return new Observable<IUserActive>(observer => {
        observer.error('Sólo un usuario de la sede ' + user.headquarter_name + ' puede hacer checkout al usuario ' + user.name);
      });
    }

    return this.http.post(this.servicesRoutes.checkOut(), JSON.stringify({ hid: user.hid }))
      .map((response: Response) => response.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'))
      ;
  }

  checkOutAll(): Observable<object> {
    return this.http.post(this.servicesRoutes.checkOutAll(), JSON.stringify({ _: new Date().getTime() }))
      .map((response: Response) => response.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server error'))
      ;
  }


}
