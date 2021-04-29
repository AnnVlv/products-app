import {Injectable} from '@angular/core';

import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';

import {Owner} from '../../shared/models';
import {OwnerStateGetter} from '../../state/owner/owner.getter';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  @Select(OwnerStateGetter.owners) owners$: Observable<Owner[]>;
  @Select(OwnerStateGetter.defaultOwner) defaultOwner$: Observable<Owner[]>;
}
