import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
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

  constructor(private productService: ProductServiceService, private categoryService: CategoryServiceService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe({
        next: (result: Product[]) => {
          this.products = result
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }

}
