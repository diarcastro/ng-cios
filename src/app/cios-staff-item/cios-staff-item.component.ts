import { Component, OnInit, Input } from '@angular/core';
import { IStaff } from '../interfaces/IStaff';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'cios-staff-item',
  templateUrl: './cios-staff-item.component.html',
  styleUrls: ['./cios-staff-item.component.scss']
})
export class CiosStaffItemComponent implements OnInit {

  @Input() item: IStaff;
  @Input() loggedUser: IUser;

  constructor() { }

  ngOnInit() {
  }

}
