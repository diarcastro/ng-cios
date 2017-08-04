import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';



@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  constructor() {
  }

  transform(value: number): string {
    return moment.unix(value).fromNow();
  }
}
