import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MomentPipe } from './moment.pipe';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(timestamp: number, format: string = 'EEEE dd \'de\' MMMM \'de\' yy, hh:mm a', ifEmpty: string = ' '): string {
    if (!timestamp) {
      return ifEmpty;
    }

    switch (format) {
      case 'rel':
      case 'moment':
      case 'relative':
        return new MomentPipe().transform(timestamp);
      default:
        return new DatePipe('es').transform(timestamp * 1000, format);
    }
  }

}
