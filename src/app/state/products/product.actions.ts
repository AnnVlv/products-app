import {Product} from '../../shared/models';


export class GetProducts {
  static readonly type = '[Product] Get Products';
}

export class GetProductById {
  static readonly type = '[Product] Get Product By Id';
  constructor(public id: number) {}
}

export class SetProducts {
  static readonly type = '[Product] Set Products';
  constructor(public products: Product[]) {}
}

export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public product: Product) {}
}

export class EditProduct {
  static readonly type = '[Product] Edit Product';
  constructor(public product: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Product] Delete Product';
  constructor(public id: number) {}
}

export class DeleteProductSuccess {
  static readonly type = '[Product] Delete Product Success';
  constructor(public id: number) {}
}

export class DeleteProductFail {
  static readonly type = '[Product] Delete Product Fail';
}
