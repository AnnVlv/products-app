import {Product} from '../../shared/models';


export class SetProducts {
  static readonly type = '[Product] Set Products';
  constructor(public entities: Product[]) {}
}

export class SetSelectedId {
  static readonly type = '[Product] Set Selected Id';
  constructor(public id: number) {}
}

export class GetProducts {
  static readonly type = '[Product] Get Products';
}

export class GetProductsSuccess {
  static readonly type = '[Product] Get Products Success';
  constructor(public entities: Product[]) {}
}

export class GetProductsFail {
  static readonly type = '[Product] Get Products Fail';
}

export class GetProductById {
  static readonly type = '[Product] Get Product By Id';
  constructor(public id: number) {}
}

export class GetProductByIdSuccess {
  static readonly type = '[Product] Get Product By Id Success';
  constructor(public entity: Product) {}
}

export class GetProductByIdFail {
  static readonly type = '[Product] Get Product By Id Fail';
}

export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public entity: Product) {}
}

export class AddProductSuccess {
  static readonly type = '[Product] Add Product Success';
  constructor(public entity: Product) {}
}

export class AddProductFail {
  static readonly type = '[Product] Add Fail';
}

export class EditProduct {
  static readonly type = '[Product] Edit Product';
  constructor(public entity: Product) {}
}

export class EditProductSuccess {
  static readonly type = '[Product] Edit Product Success';
  constructor(public entity: Product) {}
}

export class EditProductFail {
  static readonly type = '[Product] Edit Product Fail';
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
