import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Sales} from '../../model/sales';
import {SalesService} from '../../services/sales.service';
import {SortByPipe} from '../../services/sort-by.pipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css'],
})
export class SalesListComponent implements OnInit {

  constructor(private _salesService: SalesService, private router: Router) { }

  searchText: string;
  labelPosition: string;
  isDec: boolean;
  direction: number;
  error: string;
  salesList: Array<Sales>;

  ngOnInit() {
    this.labelPosition = '';
    this.salesList = new Array();
    this._salesService.getSales().subscribe(sales => {
      this.salesList = sales;
    },
      error1 => this.error = error1
    );
  }

  navigate(sales: Sales): void {
    console.log(JSON.stringify(sales));
    this.router.navigate(['/detail', sales.id]);
    console.log('ok');
  }


}
