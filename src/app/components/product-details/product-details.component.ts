import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {EditProduct, GetProductById} from '../../state/product.actions';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../models/product.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  productKeys: string[];
  isReady = false;
  isEdit = false;
  form: FormGroup;
  subs: Subscription[] = [];

  @Select(state => state.products.products) products$!: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    let productId;
    const sub = this.route.params.pipe(
      tap(({ id }) => {
        if (isNaN(Number(id))) {
          this.router.navigate(['/']);
        }
        productId = Number(id);
      }),
      switchMap(({ id }) => this.store.dispatch(new GetProductById(id))),
      withLatestFrom(this.products$)
    ).subscribe(([_, products]) => {
      this.isReady = true;
      this.product = products.find(product => product.id === productId);
      this.getProductKeys();
      this.buildForm();
    }, () => this.router.navigate(['/']));
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  edit(): void {
    this.store.dispatch(new EditProduct({
      ...this.form.value,
      id: this.product.id
    }));
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
    let keys = Object.keys(this.product);
    keys = keys.filter(key => key !== 'id');
    this.productKeys = keys;
  }
}
