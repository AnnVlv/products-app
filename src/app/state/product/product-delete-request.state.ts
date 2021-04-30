import {Injectable} from '@angular/core';

import {RequestState} from 'ngxs-requests-plugin';


@Injectable()
@RequestState('productDeleteRequest')
export class ProductDeleteRequestState { }
