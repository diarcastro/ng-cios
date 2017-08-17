import {
  Component
  , OnInit
  , Input
  , Output
  , EventEmitter
  , ViewEncapsulation
  , ViewChild
  , AfterContentChecked
} from '@angular/core';
import { IHeadquarter } from '../interfaces/IHeadquarter';
import { IUser } from '../interfaces/IUser';
import { HeadquarterService } from '../services/headquarter.service';
import swal from 'sweetalert2';

@Component({
  selector: 'cios-headquarter-item',
  templateUrl: './cios-headquarter-item.component.html',
  styleUrls: ['./cios-headquarter-item.component.scss'],
  encapsulation: ViewEncapsulation.None
  , providers: [HeadquarterService]
})
export class CiosHeadquarterItemComponent implements OnInit, AfterContentChecked {

  @Input() item: IHeadquarter;
  @Input() loggedUser: IUser;
  @Output() itemRemoved: EventEmitter<IHeadquarter> = new EventEmitter<IHeadquarter>();

  @ViewChild('headquarterName') headquarterName;

  public itemEditing: IHeadquarter;

  public editing = false;
  public saving = false;

  constructor(
    private _headquarterService: HeadquarterService
  ) {
    this.itemEditing = { name: '' };
  }

  publish(item: IHeadquarter) {
    item.state = 1;
    this._save(item);
  }

  unpublish(item: IHeadquarter) {
    item.state = 0;
    this._save(item);
  }

  edit(item: IHeadquarter, input: HTMLInputElement) {
    this.editing = true;
    this.itemEditing = Object.assign({}, item);
  }

  endEditing(item: IHeadquarter, $event?: KeyboardEvent) {
    const force: boolean = !this.itemEditing ? true : false;
    if (($event && $event.keyCode === 27) || force) {
      item.name = this.itemEditing.name;
    } else {
      item.name = item.name || this.itemEditing.name;
    }

    this.editing = false;
    if (item.name !== this.itemEditing.name) {
      this.itemEditing = { name: '' };
      this._save(item);
    }

  }

  private _save(item: IHeadquarter) {
    this.saving = true;
    this._headquarterService.save(item).subscribe((response: IHeadquarter) => {
      this.saving = false;
      if (item.state < 0) {
        this.itemRemoved.emit(item);
      } else {
        for (const attr in response) {
          if (response.hasOwnProperty(attr)) {
            item[attr] = response[attr];
          }
        }
      }
      return item;
    });
  }

  remove(item: IHeadquarter) {
    this.saving = true;
    swal({
      title: 'Eliminar sede'
      , text: 'Realmente desea eliminar la sede ' + item.name + '?'
      , type: 'question'
      , showCancelButton: true
      , cancelButtonText: 'Cancelar'
      , confirmButtonText: 'Eliminar'
      , confirmButtonColor: '#d9534f'
    }).then(() => this.onConfirmRemoveItem(item), () => this.saving = false);
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

  ngAfterContentChecked() {
    if (this.editing) {
      this.headquarterName.nativeElement.focus();
    }

  }

}
