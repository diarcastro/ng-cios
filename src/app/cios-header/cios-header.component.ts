import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser, IUserResponse } from '../interfaces/IUser';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'cios-header',
  templateUrl: './cios-header.component.html',
  styleUrls: ['./cios-header.component.scss']
})
export class CiosHeaderComponent implements OnInit {

  public user: IUser;

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.userService.get().subscribe((response: IUserResponse) => {
      this.user = response.user;
    });
  }

}
