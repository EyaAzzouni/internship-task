import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Sales} from '../model/sales';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private _http: HttpClient) { }

  private Url = 'api/sales';

  getSales(): Observable<Sales[]> {
    return this._http.get<Sales[]>(this.Url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError), );
  }

  getSalesById(id: number): Observable<Sales> {
    if (isNaN(id)) {
        return of(this.initializeProduct());
    }
    return this._http.get<Sales>(`${this.Url}/${id}`).pipe(
      tap(data => console.log('Detail element: ' + JSON.stringify(data))),
      catchError(this.handleError), );
  }

  editSales(sales: Sales): Observable<Sales> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<Sales>(`${this.Url}/${sales.id}`, sales, { headers: headers })
      .pipe(
        tap(() => console.log('update sales: ' + sales.id )),
        map(() => sales),
        catchError(this.handleError)
      );
  }

  createProduct(sales: Sales): Observable<Sales> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    sales.id = null;
    return this._http.post<Sales>(this.Url, sales, { headers: headers })
      .pipe(
        tap(data => console.log('createSales: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteSales(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.Url}/${id}`;
    return this._http.delete<Sales>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteSales: ' + id)),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeProduct(): Sales {
    // Return an initialized object
    return {
      id: 0,
      date: null,
      salesType: null,
      bookingText: null,
      amount: null
    };
  }
}
