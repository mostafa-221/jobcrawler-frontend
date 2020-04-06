import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertStringToDots'
})
export class ConvertStringToDotsPipe implements PipeTransform {

  transform(value: string, num: number): string {
      if (value == null || value.length <= (num + 1)) {
          return value;
      } else {
          return value.substring(0, num) + '...';
      }
  }

}
