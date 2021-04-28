import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ProductsService} from '../services/products.service';
import {StateModel} from '../../shared/models';


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Observable<{ state: StateModel, productId: number }>> {
  constructor(private productsService: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<{ state: StateModel, productId: number }> {
    const productId = +route.paramMap.get('id');
    return this.productsService.getProductById(productId)
      .pipe(map(state => ({ state, productId })));
  }
}
