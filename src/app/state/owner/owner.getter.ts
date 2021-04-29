import {Selector} from '@ngxs/store';

import {OwnersStateModel, OwnerState} from './owner.state';
import {Owner} from '../../shared/models';


export class OwnerStateGetter {
  @Selector([OwnerState])
  static owners({ entities, ids }: OwnersStateModel): Owner[] {
    return ids.map(id => entities[id]);
  }

  @Selector([OwnerState])
  static defaultOwner({ defaultEntity }: OwnersStateModel): Owner {
    return defaultEntity;
  }
}
