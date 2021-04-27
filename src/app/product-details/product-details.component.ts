import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tap, withLatestFrom} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

import {Product} from '../shared/models';
import {OWNER_INFO, ProductsService} from '../core/services/products.service';
import {ProductsProviderService} from '../core/services/state-providers';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  productKeys: string[];
  isEdit = false;
  form: FormGroup;
  subscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsProviderService: ProductsProviderService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = ProductsService.isLoading$;

    this.isLoading$
      .pipe(withLatestFrom(this.productsProviderService.products$))
      .subscribe(([_, products]) => {
        this.product = products?.find(product => product.id === this.product.id);
        this.isEdit = false;
      });

    let productId;
    this.subscription = this.route.params.pipe(
      tap(({ id }) => {
        if (isNaN(Number(id))) {
          this.router.navigate(['/']);
        }
        productId = Number(id);
      }),
      tap(({ id }) => this.productsProviderService.getProductById(id)),
      withLatestFrom(this.productsProviderService.products$)
    ).subscribe(([_, products]) => {
      this.product = products.find(product => product.id === productId);
      this.getProductKeys();
      this.buildForm();
    }, () => this.router.navigate(['/']));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  edit(): void {
    this.productsProviderService.editProduct({
      ...this.form.value,
      id: this.product.id,
      ...OWNER_INFO
    });
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0)]),
      count: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)])
    });
    this.productKeys.forEach(key => this.form.controls[key]?.setValue(this.product[key]));
  }

  private getProductKeys(): void {
    const notShow = ['id', 'owner', 'ownerId'];
    let keys = Object.keys(this.product);
    keys = keys.filter(key => !(notShow.includes(key)));
    this.productKeys = keys;
  }
}
