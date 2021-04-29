import {Selector} from '@ngxs/store';

import {OwnerStateModel, OwnerState} from './owner.state';
import {Owner} from '../../shared/models';


export class OwnerStateGetter {
  @Selector([OwnerState])
  static owners({ entities, ids }: OwnerStateModel): Owner[] {
    return ids.map(id => entities[id]);
  }

  @Selector([OwnerState])
  static defaultOwner({ defaultEntity }: OwnerStateModel): Owner {
    return defaultEntity;
  }
}
