import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  width :string = '';

  constructor(
    private productService: ProductServiceService, 
    private categoryService: CategoryServiceService
  ) { }

  ngOnInit(): void {
    console.log(this.products)
    if (this.detectMob()) {
      this.width = '100%';
    } else {
      this.width = '30%';
    }
  }

  getAllProducts(products : Product[]) {
    this.products = products;
    console.log(this.products)
  }

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
