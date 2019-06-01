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
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {UserService} from './services/user.service';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { UsersComponent } from './pages/users/users.component';
import {AuthGuard} from './guards/auth.guard';
import { CryptoComponent } from './pages/crypto/crypto.component';
import { YourStockComponent } from './pages/your-stock/your-stock.component';
import { WatchlistDialogComponent } from './pages/your-stock/watchlist-dialog/watchlist-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularFireDatabase } from 'angularfire2/database';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RecentlySearchedComponent } from './pages/recently-searched/recently-searched.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'your-stock', component: YourStockComponent },
  { path: 'forex', component: ForexComponent },
  { path: 'company-lookup', component: CompanyLookupComponent },
  { path: 'company-lookup/:id', component: CompanyLookupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'crypto', component: CryptoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    IndicesComponent,
    DashboardComponent,
    NewsTableComponent,
    ForexComponent,
    CompanyLookupComponent,
    StocksComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    CryptoComponent,
    YourStockComponent,
    WatchlistDialogComponent,
    RecentlySearchedComponent
  ],
  entryComponents: [WatchlistDialogComponent],
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
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase, 'fin-watch'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressBarModule,
    NgxSpinnerModule
  ],
  providers: [AngularFireDatabase, IndicesService, AuthGuard, UserService, HttpClientModule, { provide: FirestoreSettingsToken, useValue: {}}, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
