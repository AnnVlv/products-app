import {Product} from '../../models';


export class SetOwners {
  static readonly type = '[Owners] Set Owners';
  constructor(public products: Product[], public toClean: boolean) {}
}

export class CheckOwnersAfterProductDelete {
  static readonly type = '[Owners] Check Owners After Product Delete';
  constructor(public product: Product) {}
}
