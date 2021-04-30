import {Component, OnInit} from '@angular/core';

import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ProductService} from './core/services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isShowingSpinner$: Observable<boolean>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.isShowingSpinner$ = combineLatest([
      this.productService.productsGetRequestState$,
      this.productService.productGetRequestState$,
      this.productService.productPostRequestState$,
      this.productService.productPutRequestState$,
      this.productService.productDeleteRequestState$,
    ]).pipe(
      map(requests => requests.some(request => request.loading)),
    );
  }
}
