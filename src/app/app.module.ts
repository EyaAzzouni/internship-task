import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import {ToolbarComponent} from './component/toolbar/toolbar.component';
import {SidenavComponent} from './component/sidenav/sidenav.component';
import {RouterModule} from '@angular/router';
import { SalesListComponent } from './component/sales-list/sales-list.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SortByPipe } from './services/sort-by.pipe';
import { FilterPipe } from './services/filter.pipe';
import { CutPipe } from './services/cut.pipe';
import { SalesDetailComponent } from './component/sales-detail/sales-detail.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {SalesData} from './model/salesData';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    SalesListComponent,
    SortByPipe,
    FilterPipe,
    CutPipe,
    SalesDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(SalesData),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: SalesListComponent },
      { path: 'detail/:id', component: SalesDetailComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
