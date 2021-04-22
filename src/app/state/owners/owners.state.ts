import {Injectable} from '@angular/core';
import {Action, State, StateContext, Store} from '@ngxs/store';
import {OwnersStateModel, Product} from '../../models';
import {CheckOwnersAfterProductDelete, SetOwners} from './owners.actions';
import {ProductsState} from '../products/poducts.state';


@State<OwnersStateModel>({
  name: 'owners',
  defaults: {
    ownersIds: [],
    owners: {}
  }
})
@Injectable()
export class OwnersState {
  constructor(private store: Store) {}

  @Action(SetOwners)
  addOwners(ctx: StateContext<OwnersStateModel>, { products, toClean }: { products: Product[], toClean: boolean }): void {
    const state = ctx.getState();

    let ownersIds = [];
    let ownersObj = {};
    if (!toClean) {
      ownersIds = [ ...state.ownersIds ];
      ownersObj = { ...state.owners };
    }

    products.forEach(product => {
      if (!ownersIds.includes(product.ownerId)) {
        ownersIds.push(product.ownerId);
        ownersObj[product.ownerId] = product.owner;
      }
    });

    ctx.setState({
      ...state,
      ownersIds,
      owners: ownersObj
    });
    console.log(ctx.getState());
  }

  @Action(CheckOwnersAfterProductDelete)
  checkOwnersAfterProductDelete(ctx: StateContext<OwnersStateModel>, { product }: { product: Product }): void {
    const state = ctx.getState();
    const products = this.store.selectSnapshot(ProductsState.products);

    const deletedProductOwnerId = product.ownerId;
    let ownersIds = [ ...state.ownersIds ];
    const owners = { ...state.owners };

    if (!products.some(p => p.ownerId === deletedProductOwnerId)) {
      ownersIds = ownersIds.filter(ownerId => ownerId !== deletedProductOwnerId);
      delete owners[deletedProductOwnerId];
    }

    ctx.setState({ ...state, ownersIds, owners });
    console.log(ctx.getState());
  }
}
