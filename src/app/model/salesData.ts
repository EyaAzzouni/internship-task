import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Sales} from './sales';

export class SalesData implements InMemoryDbService {
  createDb() {
    const sales: Sales[] = [
      {
        'id': 1,
        'date': new Date('2013-03-11'),
        'salesType': 'Digital Marketing',
        'bookingText': 'Daniel firs booking',
        'amount': 9111.1
      },
      {
        'id': 2,
        'date': new Date('2011-05-08'),
        'salesType': 'IT Consultation',
        'bookingText': 'three times/week',
        'amount': 2111.1
      },
      {
        'id': 3,
        'date': new Date('2017-04-01'),
        'salesType': 'RFP',
        'bookingText': 'All booked by Mr Wilson',
        'amount': 5111.1
      },
      {
        'id': 4,
        'date': new Date('2018-04-12'),
        'salesType': 'IT Training',
        'bookingText': 'Intensive sessions',
        'amount': 4111.1
      },
      {
        'id': 5,
        'date': new Date('2018-05-03'),
        'salesType': 'Digital Marketing',
        'bookingText': 'daily statistics',
        'amount': 8111.1
      }
    ];
    return { sales };
  }

}
