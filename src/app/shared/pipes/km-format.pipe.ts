import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kmFormat',
  standalone: true,
})
export class KmFormatPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('en-US') + ' km';
  }
}
