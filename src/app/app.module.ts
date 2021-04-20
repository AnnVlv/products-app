import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductsTableComponent} from './components/products-table/products-table.component';
import {ProductsState} from './state/poduct.state';
import {environment} from '../environments/environment';
import {NgxsModule} from '@ngxs/store';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {DeleteProductModalComponent} from './components/delete-product-modal/delete-product-modal.component';
import {MatButtonModule} from '@angular/material/button';
import {AddProductModalComponent} from './components/add-product-modal/add-product-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductsTableComponent,
    DeleteProductModalComponent,
    AddProductModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgxsModule.forRoot([ProductsState], {
      developmentMode: !environment.production
    }),
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
