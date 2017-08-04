import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserActive, IUserNote } from '../interfaces/IUserActive';
import { UserNoteService } from '../services/user-note.service';
import { IGenericResponse } from '../interfaces/IGenericResponse';

@Component({
  selector: 'cios-user-notes',
  templateUrl: './cios-user-notes.component.html',
  styleUrls: ['./cios-user-notes.component.scss']
})
export class CiosUserNotesComponent implements OnInit {
  @Input() user: IUserActive;

  @Output() userUpdated: EventEmitter<IUserActive> = new EventEmitter<IUserActive>();

  constructor(
    private _userNoteService: UserNoteService
  ) { }

  /**
   *
   * Close a note
   *
   * @param {IUserNote} note
   * @memberof CiosUsersComponent
   */
  closeNote(note: IUserNote, user: IUserActive) {
    this._userNoteService.done(note, user).subscribe((response: IGenericResponse) => this.userUpdated.emit(user));
  }
  /**
   * Save Note
   *
   * @param {HTMLInputElement} newNote
   * @param {IUserActive} user
   * @memberof CiosUsersComponent
   */
  saveNote(newNote: HTMLInputElement, user: IUserActive) {
    this._userNoteService.create(newNote.value, user).subscribe((noteResponse: IUserNote) => this.userUpdated.emit(user));
    newNote.value = '';
  }

  ngOnInit() {
  }

}
