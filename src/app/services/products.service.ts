import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';


const URL = `http://localhost:3000/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }

  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(URL);
  }

  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${ URL }/${id}`);
  }

  add(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(URL, { ...product });
  }

  edit(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${ URL }/${ product.id }`, { ...product });
  }

  delete(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${URL}/${id}`);
  }
}
