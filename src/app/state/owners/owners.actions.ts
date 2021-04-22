import {Owner} from '../../models';


export class SetOwners {
  static readonly type = '[Owners] Set Owners';
  constructor(public owners: Owner[]) {}
}
