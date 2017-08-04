import { Injectable } from '@angular/core';

import { ServicesRoutes } from '../classes/ServicesRoutes';
import { IUserNote, IUserActive } from '../interfaces/IUserActive';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { IGenericResponse } from '../interfaces/IGenericResponse';

@Injectable()
export class UserNoteService {

  constructor(
    private _http: Http,
    private _serviceRoutes: ServicesRoutes
  ) { }

  /**
   * Mark a note as done
   *
   * @param {IUserNote} note
   * @param {IUserActive} user
   * @returns {Observable<boolean>}
   * @memberof UserNoteService
   */
  done(note: IUserNote, user: IUserActive): Observable<IGenericResponse> {
    note.closed = true;
    return this._http.post(this._serviceRoutes.makePath('Ngnotes', 'done'), JSON.stringify({ id: note.id }))
      .map((response: Response) => {
        const resp: IGenericResponse = <IGenericResponse>response.json();
        if (!resp.error) {
          const index: number = user.notes.indexOf(note);
          if (index > -1) {
            user.notes.splice(index, 1);
          }
        } else {
          note.closed = false;
        }
        return resp;
      })
      .catch((err: any) => {
        note.closed = false;
        return Observable.throw(err.json().error || 'Server error');
      });
  }
  /**
   * Create a note
   *
   * @param {string} note
   * @param {IUserActive} user
   * @returns {Observable<IUserNote>}
   * @memberof UserNoteService
   */
  create(note: string, user: IUserActive): Observable<IUserNote> {
    user.notes = user.notes || [];
    const newNote: IUserNote = {
      note: note,
      date: new Date().getTime() / 1000,
      closed: false
    };
    user.notes.push(newNote);
    return this._http.post(this._serviceRoutes.makePath('Ngnotes', 'save'), JSON.stringify({ note: note, user_id: user.id }))
      .map((response: Response) => {
        const resp: IUserNote = <IUserNote>response.json();
        newNote.id = resp.id;
        newNote.date = resp.date;
        return resp;
      })
      .catch((err: any) => {
        return Observable.throw(err.json().error || 'Server error');
      });
  }

}
