import {Injectable} from '@angular/core';

import {RequestState} from 'ngxs-requests-plugin';


@Injectable()
@RequestState('productsGetRequest')
export class ProductsGetRequestState { }