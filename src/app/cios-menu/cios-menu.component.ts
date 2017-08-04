import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser, IUserResponse } from '../interfaces/IUser';

@Component({
  selector: 'cios-menu',
  templateUrl: './cios-menu.component.html',
  styleUrls: ['./cios-menu.component.scss']
})
export class CiosMenuComponent implements OnInit {

  user: IUser;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    this.userService.get().subscribe((response: IUserResponse) => {
      this.user = response.user;
    })
  }

}
