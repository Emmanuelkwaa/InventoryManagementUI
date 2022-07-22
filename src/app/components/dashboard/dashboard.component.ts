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

  constructor(
    private productService: ProductServiceService, 
    private categoryService: CategoryServiceService
  ) { }

  ngOnInit(): void {
    console.log(this.products)
  }

  getAllProducts(products : Product[]) {
    this.products = products;
    console.log(this.products)
  }
}
