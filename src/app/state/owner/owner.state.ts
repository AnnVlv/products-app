import {Injectable} from '@angular/core';

import {Action, State, StateContext} from '@ngxs/store';

import {Owner} from '../../shared/models';
import {SetOwners} from './owner.actions';


export interface OwnersStateModel {
  ids: number[];
  entities: {
    [key: number]: Owner
  };
  defaultEntity: Owner;
}


@State<OwnersStateModel>({
  name: 'owners',
  defaults: {
    ids: [],
    entities: {},
    defaultEntity: {
      id: 1,
      name: 'Owner 1'
    }
  }
})
@Injectable()
export class OwnerState {
  @Action(SetOwners)
  addOwners(ctx: StateContext<OwnersStateModel>, { entities }: { entities: Owner[] }): void {
    const state = ctx.getState();

    const ids = [...new Set([
      ...state.ids,
      ...entities.map(owner => owner.id)
    ])];

    const newEntitiesArr = entities.map(owner => ({
      [owner.id]: owner
    }));

    const entitiesObj = newEntitiesArr.reduce((acc, owner) => {
      const id = Object.keys(owner).find(key => ids.includes(+key));
      return {
        ...acc,
        [id]: owner[id]
      };
    }, {});

    ctx.patchState({
      ids,
      entities: entitiesObj
    });
  }
}
