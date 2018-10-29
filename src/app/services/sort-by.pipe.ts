import { Pipe, PipeTransform } from '@angular/core';
import {Sales} from '../model/sales';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  static val = -1;

  transform(salesList: Array<Sales>, labelPosition?: string): Array<Sales> {
    if (labelPosition === 'date') {
        salesList.sort(function(a, b) {
          if (new Date(b.date) < new Date(a.date)) { return -1 ; } else {return 1 ; }
        });
    } else if (labelPosition === 'amount') {
      salesList.sort(function (a, b) {
        if ( b.amount < a.amount) {return -1; } else {return 1; }
      });
    }
    return salesList;
  }

}
