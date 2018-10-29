import { Pipe, PipeTransform } from '@angular/core';
import {Sales} from '../model/sales';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(salesList: Array<Sales>, searchText?: string): Array<Sales> {
    if (searchText === null || typeof searchText === 'undefined') {
      return salesList;
    }
    return salesList.filter(sales => {
      return (sales.salesType.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        sales.bookingText.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    });
  }

}
