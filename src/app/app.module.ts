import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { AppComponent } from './app.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { IndicesComponent } from './pages/indices/indices.component';
import {IndicesService} from './services/indices.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {InterceptorService} from './services/interceptor.service';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { DataTableComponent } from './pages/data-table/data-table.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NewsTableComponent} from './pages/news-table/news-table.component';
import {MatCardModule} from '@angular/material/card';
import { ForexComponent } from './pages/forex/forex.component';
import {ChartsModule} from 'ng2-charts';
import { CompanyLookupComponent } from './pages/company-lookup/company-lookup.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { StocksComponent } from './pages/stocks/stocks.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forex', component: ForexComponent },
  { path: 'company-lookup', component: CompanyLookupComponent },
  { path: 'company-lookup/:id', component: CompanyLookupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    IndicesComponent,
    DashboardComponent,
    DataTableComponent,
    NewsTableComponent,
    ForexComponent,
    CompanyLookupComponent,
    StocksComponent
  ],
  imports: [
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatTableModule,
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatCardModule,
    ChartsModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatSortModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [IndicesService, HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
