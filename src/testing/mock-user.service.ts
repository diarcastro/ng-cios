import { IUserResponse, IUser, IUserPermissions } from '../app/interfaces/IUser';
import { IHeadquarter } from '../app/interfaces/IHeadquarter';
import { Observable } from 'rxjs/Observable';

export class MockUserService {

  static USERNAME = 'Test User';
  static FAKE_HEADQUARTER = 'Test User';

  permissions: IUserPermissions = {
    admin: true,
    options: true,
    qr_fix: true,
    headquarter: true,
    staff: true,
    checkoutbatch: true,
    reports: true,
    create: true,
  };

  headquarters: IHeadquarter[] = [
    { id: 1, name: MockUserService.FAKE_HEADQUARTER }
  ];

  user: IUser = {
    id: 1,
    name: MockUserService.USERNAME,
    permissions: this.permissions,
    headquarter: this.headquarters[0]
  };


  response: IUserResponse = {
    user: this.user,
    headquarters: this.headquarters,
    fix: 0
  };

  get(): Observable<IUserResponse> {
    return new Observable<IUserResponse>(observer => {
      observer.next(this.response);
    })
  }
}

/*
class UserServiceSpy {

    permissions: IUserPermissions = {
      admin: true,
      options: true,
      qr_fix: true,
      headquarter: true,
      staff: true,
      checkoutbatch: true,
      reports: true,
      create: true,
    };

    user: IUser = {
      id: 1,
      name: 'Test User',
      permissions: this.permissions
    };

    headquarters: IHeadquarter[] = [
      { id: 1, name: 'Fake Sede' }
    ];

    response: IUserResponse = {
      user: this.user,
      headquarters: this.headquarters,
      fix: 0
    };


    get1 = jasmine.createSpy('get').and.callFake(() => {
      console.log('UserServiceSpy.jasmine.get()');
      return new Observable<IUserResponse>(observer => observer.next(this.response));
    });

    get(): Observable<IUserResponse> {

      console.log('UserServiceSpy.gets()');

      return new Observable<IUserResponse>(observer => {
        observer.next(this.response);
      });

    }
  };
*/
