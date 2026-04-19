import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kmFormat',
})
export class KmFormatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
