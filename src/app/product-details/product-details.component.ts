import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Product} from '../shared/models';
import {OWNER_INFO} from '../state/products/poducts.state';
import {ProductsService} from '../core/services/products.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productId: number;
  productKeys: string[];
  isEdit = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.data?.data?.productId;
    this.productsService.products$.subscribe(products => {
      this.product = products?.find(product => product.id === this.productId);
      this.isEdit = false;
      this.product = products.find(product => product.id === this.productId);
      this.getProductKeys();
      this.buildForm();
    });
  }

  edit(): void {
    this.productsService.editProduct({
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
