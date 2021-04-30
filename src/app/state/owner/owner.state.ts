import {Injectable} from '@angular/core';

import {Action, State, StateContext} from '@ngxs/store';

import {Owner} from '../../shared/models';
import {SetOwners} from './owner.actions';


export interface OwnerStateModel {
  ids: number[];
  entities: {
    [key: number]: Owner
  };
  defaultEntity: Owner;
}


@State<OwnerStateModel>({
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
  setOwners(ctx: StateContext<OwnerStateModel>, { entities }: { entities: Owner[] }): void {
    const state = ctx.getState();

    const ids = [...new Set([
      ...state.ids,
      ...entities.map(owner => owner.id)
    ])];

    const entitiesObj = { ...state.entities };
    entities.forEach(entity => {
      entitiesObj[entity.id] = entity;
    });

    ctx.patchState({
      ids,
      entities: entitiesObj
    });
  }
}
