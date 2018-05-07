import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadline'
})
export class DatePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length) {
      const splitIndex = value.lastIndexOf(':');
      const input = value.slice(0, splitIndex).split('T');
      input[0] = input[0].split('-').reverse().join(' / ');
      return (input[0] + '   ' + input[1]);
    }
    return 'N/A';
  }
}
