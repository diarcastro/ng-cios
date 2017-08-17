import { IUserResponse, IUser, IUserPermissions } from '../app/interfaces/IUser';
import { IHeadquarter, IHeadquarterResponse } from '../app/interfaces/IHeadquarter';
import { Observable } from 'rxjs/Observable';
import { IHeadquarterFilter } from '../app/interfaces/IFilter';

export class MockHeadquerterService {

  save(item: IHeadquarter): Observable<IHeadquarter> {
    console.log('save Mock');

    return new Observable<IHeadquarter>(observer => {
      const newItem: IHeadquarter = Object.assign({}, item);
      newItem.updated_at = new Date().getTime() / 1000;
      observer.next(newItem);
    });
  }

  getAll(filter: IHeadquarterFilter): Observable<IHeadquarterResponse> {
    console.log('getAll Mock');

    const headquarters: IHeadquarter[] = [
      { id: 1, name: 'Sede 1' }
      , { id: 2, name: 'Sede 2' }
      , { id: 3, name: 'Sede 3' }
      , { id: 4, name: 'Sede 4' }
    ];

    const response: IHeadquarterResponse = {
      headquarters
      , filter
    };

    return new Observable<IHeadquarterResponse>(observer => {
      observer.next(response);
    });
  }
}
