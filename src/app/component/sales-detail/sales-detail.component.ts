import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {buildPath} from 'selenium-webdriver/http';
import {Sales} from '../../model/sales';
import {SalesService} from '../../services/sales.service';
import {DatePipe} from '@angular/common';

function dateValidator(): ValidatorFn {
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    const start = new Date(1900, 0, 1);
    const today = new Date();
    const germanDatePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
    if (c.pristine) {
      return null;
    }
      if (new Date(c.value.toString()) < start) {
        return { 'start': true};
      }
      if (new Date(c.value.toString()) > today) {
        return { 'end': true};
      }
      if (!c.value.match(germanDatePattern)) {
        return { 'germanDate': true };
      }
  };
}

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit, OnDestroy {

  pageTitle: string;

  detailForm: FormGroup;
  sub: Subscription;

  dateMessage: string;
  amountMessage: string;
  errorMessage: string;

  sales: Sales;

  private validationMessages = {
    start: 'Date must be after 1900',
    end: 'Date must be before the current',
    germanDate: 'Date must be dd.MM.yyyy format',
    required: 'Date must not be empty',
  };

  private validationMessagesAmount = {
    required: 'Amount is required',
    maxlength: 'Length of amount must be less than 8',
    minlength: 'Length of amount must be more than 2',
    max: 'Amount must be less than 20,000,000',
    min: 'Amount must be more than 50',
    pattern: 'Amount must contain only number, \",.\"',
  };

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private salesService: SalesService,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(param => {
      const id = +param['id'];
      this.getSales(id);
    });

    this.detailForm = this.fb.group({
      date: ['', [Validators.required, dateValidator()]],
      salesType: ['', [Validators.required]],
      bookingText: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(2),
      Validators.pattern('^[0-9]*([,.][0-9]*)*?$'), Validators.max(20000000), Validators.min(50)]]
    });

    const dateControl = this.detailForm.get('date');
    const amountControl = this.detailForm.get('amount');

    dateControl.valueChanges.subscribe(value =>
      this.setMessage(dateControl));
    amountControl.valueChanges.subscribe(value =>
      this.setMessageAmount(amountControl));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setMessage(c: AbstractControl): void {
    this.dateMessage = ' ';
    if ((c.touched || c.dirty) && c.errors) {
      this.dateMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' and ');
    }
  }

  setMessageAmount(c: AbstractControl): void {
    this.amountMessage = ' ';
    if ((c.touched || c.dirty) && c.errors) {
      this.amountMessage = Object.keys(c.errors).map(key =>
        this.validationMessagesAmount[key]).join(' and ');
    }
  }

  getSales(id: number): void {
    this.salesService.getSalesById(id).subscribe( (sales: Sales) => {
      this.sales = sales;
      this.displayPlanningArticle(sales);
    },
      error1 => this.errorMessage = error1
    );
  }

  displayPlanningArticle(sales: Sales): void {
    if (this.detailForm) {
      this.detailForm.reset();
    }
    this.sales = sales;

    if (this.sales.id === 0) {
      this.pageTitle = 'You can add sales item here!';
    } else {
      this.pageTitle = 'You can edit or delete the item here!';
      this.detailForm.patchValue({
        date: [{value: new DatePipe('en-US').transform(new Date(sales.date), 'dd.MM.yyyy')}.value],
        salesType: sales.salesType,
        bookingText: this.sales.bookingText,
        amount: this.sales.amount
      });
    }
  }

  save() {
    if (this.detailForm.dirty) {
      const p = { ...this.sales, ...this.detailForm.value };

      if (p.id === 0) {
        this.salesService.createProduct(p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.salesService.editSales(p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.detailForm.reset();
    this.router.navigate(['/welcome']);
  }

  deleteSales(): void {
      if (this.sales.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the sales: ${this.sales.salesType}?`)) {
        this.salesService.deleteSales(this.sales.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

}
