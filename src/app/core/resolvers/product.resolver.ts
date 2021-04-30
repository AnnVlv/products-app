import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {Observable} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {IRequest} from 'ngxs-requests-plugin';

import {ProductService} from '../services/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Observable<IRequest>> {
  constructor(private productsService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IRequest> {
    const productId = Number(route.paramMap.get('id'));
    this.productsService.getProductById(productId);
    return this.productsService.productGetRequestState$
      .pipe(
        filter(request => request.loaded),
        take(1),
      );
  }
}
