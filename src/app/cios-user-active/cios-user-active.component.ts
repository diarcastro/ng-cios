import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserActive } from '../interfaces/IUserActive';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'cios-user-active',
  templateUrl: './cios-user-active.component.html',
  styleUrls: ['./cios-user-active.component.scss']
})
export class CiosUserActiveComponent implements OnInit {

  @Input() showCancelButton = false;
  @Input() user: IUserActive;
  @Input() loggedUser: IUser;

  @Output() userUpdated: EventEmitter<IUserActive> = new EventEmitter<IUserActive>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _userService: UserService
  ) { }

  onUserUpdated(user: IUserActive) {
    this.userUpdated.emit(user);
  }

  printQR(user: IUserActive) {
    const win: Window = window.open('',
      '_blank', 'location=no, width=' + window.innerWidth + ', height=' + window.innerHeight + ', top=0px, left=0px');
    self.focus();
    win.document.write(`
      <html>
        <head></head>
        <body style="text-align:center;">
          <img src="${user.qr}" style="margin: 0 auto;" />
        </body>
      </html>
    `);
    win.print();
    win.close();

  }

  checkIn(user: IUserActive) {
    user.saving = true;
    this._userService.checkIn(user).subscribe((response: IUserActive) => {
      user.saving = false;
      for (const i in response) {
        if (response.hasOwnProperty(i)) {
          user[i] = response[i];
        }
      }
      this.onUserUpdated(user);
    }, error => {
      user.saving = false;
    });
  }

  onCancel() {
    this.cancel.emit(true);
  }

  checkOut(user: IUserActive) {
    user.saving = true;
    this._userService.checkOut(user).subscribe((response: IUserActive) => {
      user.saving = false;
      user.dateOut = response.dateOut;
      this.onUserUpdated(user);
    }, error => {
      user.saving = false;
    });
  }

  ngOnInit() {

  }

}
