import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';

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
}
