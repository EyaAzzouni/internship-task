import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut'
})
export class CutPipe implements PipeTransform {

  transform(bookingText: string, size?: number): string {
    return bookingText.slice(0, size);
  }

}
