import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter',
  standalone: true
})
export class CustomFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
