import {Injectable} from '@angular/core';

import {Action, State, StateContext} from '@ngxs/store';

import {Owner, OwnersStateModel} from '../../shared/models';
import {SetOwners} from './owners.actions';


@State<OwnersStateModel>({
  name: 'owners',
  defaults: {
    ownersIds: [],
    owners: {}
  }
})
@Injectable()
export class OwnersState {
  @Action(SetOwners)
  addOwners(ctx: StateContext<OwnersStateModel>, { owners }: { owners: Owner[] }): void {
    const state = ctx.getState();

    const ownersIds = [...new Set([
      ...state.ownersIds,
      ...owners.map(owner => owner.id)
    ])];

    const newOwnersArr = owners.map(owner => ({
      [owner.id]: owner
    }));

    const ownersObj = newOwnersArr.reduce((acc, owner) => {
      const id = Object.keys(owner).find(key => ownersIds.includes(+key));
      return {
        ...acc,
        [id]: owner[id]
      };
    }, {});

    ctx.patchState({
      ownersIds,
      owners: ownersObj
    });
  }
}
