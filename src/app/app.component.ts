import {Component, OnInit} from '@angular/core';

import {combineLatest} from 'rxjs';

import {ProductService} from './core/services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isShowingSpinner = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    combineLatest(
      this.productService.productsGetRequestState$,
      this.productService.productGetRequestState$,
      this.productService.productPostRequestState$,
      this.productService.productPutRequestState$,
      this.productService.productDeleteRequestState$
    ).subscribe(requests => {
      this.isShowingSpinner = requests.some(request => request.loading);
    });
  }
}
