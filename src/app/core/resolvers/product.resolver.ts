import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {Observable} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';

import {ProductService} from '../services/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Observable<any>> {
  constructor(private productsService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productId = Number(route.paramMap.get('id'));
    this.productsService.getProductById(productId);

    return this.productsService.productGetRequestState$.pipe(
      filter(request => request.loading),
      take(1),
      switchMap(() => this.productsService.productGetRequestState$.pipe(
        filter(request => request.loaded),
        take(1),
      )),
    );
  }
}
