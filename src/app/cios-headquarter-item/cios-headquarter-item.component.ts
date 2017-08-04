import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHeadquarter } from '../interfaces/IHeadquarter';
import { IUser } from '../interfaces/IUser';
import { HeadquarterService } from '../services/headquarter.service';
import swal from 'sweetalert2';

@Component({
  selector: 'cios-headquarter-item',
  templateUrl: './cios-headquarter-item.component.html',
  styleUrls: ['./cios-headquarter-item.component.scss']
})
export class CiosHeadquarterItemComponent implements OnInit {

  @Input() item: IHeadquarter;
  @Input() loggedUser: IUser;
  @Output() itemRemoved: EventEmitter<IHeadquarter> = new EventEmitter<IHeadquarter>();

  constructor(
    private _headquarterService: HeadquarterService
  ) { }

  publish(item: IHeadquarter) {
    item.state = 1;
    this._save(item);
  }

  unpublish(item: IHeadquarter) {
    item.state = 0;
    this._save(item);
  }

  private _save(item: IHeadquarter) {
    item.saving = true;
    this._headquarterService.save(item).subscribe((response: IHeadquarter) => {
      item.saving = false;
      for (const attr in response) {
        if (response.hasOwnProperty(attr)) {
          item[attr] = response[attr];
        }
      }
      if (item.state < 0) {
        this.itemRemoved.emit(item);
      }
    });
  }

  remove(item: IHeadquarter) {
    item.saving = true;
    swal({
      title: 'Eliminar sede'
      , text: 'Realmente desea eliminar la sede ' + item.name + '?'
      , type: 'question'
      , showCancelButton: true
      , cancelButtonText: 'Cancelar'
      , confirmButtonText: 'Eliminar'
      , confirmButtonColor: '#d9534f'
    }).then(() => this.onConfirmRemoveItem(item), () => item.saving = false);
  }

  private onConfirmRemoveItem(item: IHeadquarter) {
    item.state = -2;
    this._save(item);
  }

  getState(item: IHeadquarter): string {
    return +item.state ? 'Publicado' : 'Despublicado';
  }

  ngOnInit() {
  }

}
