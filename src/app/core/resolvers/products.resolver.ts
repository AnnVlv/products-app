import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';

import {Observable} from 'rxjs';

import {ProductsService} from '../services/products.service';
import {StateModel} from '../../shared/models';


@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Observable<StateModel>> {
  constructor(private productsService: ProductsService) { }

  resolve(): Observable<StateModel> {
    return this.productsService.getProducts();
  }
}
