import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderUrl = "/orders";
  orderCompleteUrl = "/orders/complete";

  constructor(private http: HttpClient) {
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.baseUrl}${this.orderCompleteUrl}`)
  }

  createOrder(order :Order) :Observable<Order> {
    return this.http.post<Order>(`${environment.baseUrl}${this.orderUrl}`, order);
  }

  public updateOrder(order :Order) :Observable<Order> {
    return this.http.put<Order>(`${environment.baseUrl}/${this.orderUrl}`, order);
  }

  public deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${environment.baseUrl}/${this.orderUrl}/${id}`);
  }
}
