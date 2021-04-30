import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';

import {Observable} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {IRequest} from 'ngxs-requests-plugin';

import {ProductService} from '../services/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Observable<IRequest>> {
  constructor(private productsService: ProductService) { }

  resolve(): Observable<IRequest> {
    this.productsService.getProducts();
    return this.productsService.productsGetRequestState$
      .pipe(
        filter(request => request.loaded),
        take(1),
      );
  }
}
