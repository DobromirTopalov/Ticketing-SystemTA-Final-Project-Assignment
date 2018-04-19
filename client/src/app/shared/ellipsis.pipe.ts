import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, check?: boolean): string {
    if (value.length > 10 && check) {
      return value.substring(0, 10) + '...';
    } else {
      return 'n/a';
    }
  }

}
