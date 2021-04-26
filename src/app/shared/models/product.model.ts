import {Owner} from './owner.model';


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  count: number;
  total?: number;
  ownerId?: number;
  owner?: Owner;
}
