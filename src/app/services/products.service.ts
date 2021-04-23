import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models';


export const OWNER_INFO = {
  ownerId: 2,
  owner: {
    id: 2,
    name: 'Owner'
  }
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  static URL = `products`;

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(ProductsService.URL);
  }

  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${ ProductsService.URL }/${ id }`);
  }

  add(product: Product): Observable<Product> {
    product = {
      ...product,
      ...OWNER_INFO
    };
    return this.httpClient.post<Product>(ProductsService.URL, { ...product });
  }

  edit(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${ ProductsService.URL }/${ product.id }`, { ...product });
  }

  delete(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${ ProductsService.URL }/${ id }`);
  }
}
