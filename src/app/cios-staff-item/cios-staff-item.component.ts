import { Component, OnInit, Input } from '@angular/core';
import { IStaff } from '../interfaces/IStaff';
import { IUser } from '../interfaces/IUser';
import { IHeadquarter } from '../interfaces/IHeadquarter';
import { StaffService } from '../services/staff.service';

import { MdSelectChange } from '@angular/material'

@Component({
  selector: 'cios-staff-item',
  templateUrl: './cios-staff-item.component.html',
  styleUrls: ['./cios-staff-item.component.scss']
})
export class CiosStaffItemComponent implements OnInit {

  @Input() item: IStaff;
  @Input() loggedUser: IUser;
  @Input() headquarters: IHeadquarter[];

  private _itemEditing: IStaff;

  public saving = false;

  constructor(
    private _staffService: StaffService
  ) { }

  onEdit() {
    this._itemEditing = Object.assign({}, this.item);
  }

  onEndEdit() {
    console.log('Cancel Edit');
    if (this.item.headquarter_id !== this._itemEditing.headquarter_id) {
      this.saving = true;
      this._staffService.save(this.item).subscribe((response: IStaff) => {
        this.saving = false;
        for (const i in response) {
          if (response.hasOwnProperty(i)) {
            this.item[i] = response[i];
          }
        }
      }, () => this.saving = false);
    }
    this._itemEditing = null;
  }

  ngOnInit() {
  }

}
