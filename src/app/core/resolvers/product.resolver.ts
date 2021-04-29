import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {ProductService} from '../services/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Observable<any>> {
  constructor(private productsService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productId = Number(route.paramMap.get('id'));
    this.productsService.getProductById(productId);
    return this.productsService.selectedProduct$
      .pipe(take(1));
  }
}
