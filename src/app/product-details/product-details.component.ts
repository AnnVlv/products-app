import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {Product} from '../shared/models';
import {ProductService} from '../core/services/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;
  productsKeysToShow: string[] = ['name', 'description', 'price', 'count', 'total'];

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.product$ = this.productsService.selectedProduct$;
  }
}
