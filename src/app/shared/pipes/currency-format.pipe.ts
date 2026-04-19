import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined || value === null) {
      return '$0';
    }
    return '$' + value.toLocaleString('en-US');
  }
}
