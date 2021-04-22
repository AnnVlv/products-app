import {Owner} from './owner.model';


export interface OwnersStateModel {
  ownersIds: number[];
  owners: {
    [key: number]: Owner
  };
}
