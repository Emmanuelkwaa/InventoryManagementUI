import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() products :Product[] = [];
  lowStockCount :any;
  constructor(
    private dialog :MatDialog,
    private productService: ProductServiceService, 
    private categoryService: CategoryServiceService,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }

  //low stock product must be less than 10 available
  lowStockProduct() {
    let countArray: any = [];

    this.products.forEach(element => {
      if(element.availableQuantity > 0 && element.availableQuantity < 10) {
        countArray.push(element.availableQuantity);
      }
    });

    return countArray.length;
  }

  mostStockProduct() {
    let countArray: any = [];

    this.products.forEach(element => {
      countArray.push(element.availableQuantity);
    });

    return Math.max(...countArray);
  }

  outOfStockProduct() {
    let countArray: any = [];

    this.products.forEach(element => {
      if(element.availableQuantity == 0) {
        countArray.push(element);
      }
    });

    return countArray.length;
  }

}
