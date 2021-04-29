import {Owner} from '../../shared/models';


export class SetOwners {
  static readonly type = '[Owner] Set Owners';
  constructor(public entities: Owner[]) {}
}
