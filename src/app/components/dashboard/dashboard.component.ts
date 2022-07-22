import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  width :string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.products)
    if (this.detectMob()) {
      this.width = '100%';
    } else {
      this.width = '30%';
    }
  }

  /**
   * Instead of making another call to get list of products,
   * this method receives the list of product from a child component
   * It can then be shared with other components, reducing the amount of http calls to get product
   * @param products An array of products received from a child component
   */
  getAllProducts(products : Product[]) {
    this.products = products;
  }

  /**
   * Detech if we are on a mobile screen
   * @returns {boolean}   Weather it is a mobile screen or not
   */
  detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
}
