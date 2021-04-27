import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

import {Product} from '../../shared/models';


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
  static isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Product[]> {
    this.emitLoadingStart();
    return this.httpClient.get<Product[]>(ProductsService.URL)
      .pipe(delay(400), tap(() => this.emitLoadingEnd()));
  }

  getById(id: number): Observable<Product> {
    this.emitLoadingStart();
    return this.httpClient.get<Product>(`${ ProductsService.URL }/${ id }`)
      .pipe(delay(400), tap(() => this.emitLoadingEnd()));
  }

  add(product: Product): Observable<Product> {
    product = {
      ...product,
      ...OWNER_INFO
    };
    this.emitLoadingStart();
    return this.httpClient.post<Product>(ProductsService.URL, { ...product })
      .pipe(delay(400), tap(() => this.emitLoadingEnd()));
  }

  edit(product: Product): Observable<Product> {
    this.emitLoadingStart();
    return this.httpClient.put<Product>(`${ ProductsService.URL }/${ product.id }`, { ...product })
      .pipe(delay(400), tap(() => this.emitLoadingEnd()));
  }

  delete(id: number): Observable<null> {
    this.emitLoadingStart();
    return this.httpClient.delete<null>(`${ ProductsService.URL }/${ id }`)
      .pipe(delay(400), tap(() => this.emitLoadingEnd()));
  }

  private emitLoadingStart(): void {
    ProductsService.isLoading$.next(true);
  }

  private emitLoadingEnd(): void {
    ProductsService.isLoading$.next(false);
  }
}
