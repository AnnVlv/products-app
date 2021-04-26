import {Owner} from '../../shared/models';


export class SetOwners {
  static readonly type = '[Owners] Set Owners';
  constructor(public owners: Owner[]) {}
}
