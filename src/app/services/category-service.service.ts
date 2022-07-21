import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  categoryUrl = "/category";

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}${this.categoryUrl}`)
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.baseUrl}/${this.categoryUrl}`, category);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.baseUrl}/${this.categoryUrl}`, category);
  }

  public deleteCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${environment.baseUrl}/${this.categoryUrl}/${category.id}`);
  }
}
