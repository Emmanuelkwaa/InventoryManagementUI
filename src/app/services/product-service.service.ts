import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';
import { ProductOut } from '../models/ProductOut';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private http: HttpClient;
  productUrl = "/products";
  productWithCategoryUrl = "/products/complete";

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}${this.productWithCategoryUrl}`)
  }

  createProduct(product :Product) :Observable<Product> {
    return this.http.post<Product>(`${environment.baseUrl}${this.productUrl}`, product);
  }

  public updateProduct(product :Product) :Observable<Product> {
    return this.http.put<Product>(`${environment.baseUrl}/${this.productUrl}`, product);
  }

  public deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${environment.baseUrl}/${this.productUrl}/${product.id}`);
  }
}
