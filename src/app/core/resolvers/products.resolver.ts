import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';

import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {ProductService} from '../services/product.service';
import {Product} from '../../shared/models';


@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Observable<Product[]>> {
  constructor(private productsService: ProductService) { }

  resolve(): Observable<Product[]> {
    this.productsService.getProducts();
    return this.productsService.products$
      .pipe(take(1));
  }
}
