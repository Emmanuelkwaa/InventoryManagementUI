import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() width: string = '';
  @Output() callGetAllProducts = new EventEmitter();

  lowStockCount: any;
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: this.width
    }).afterClosed().subscribe(val => {
      if(val==="created") {
        this.callGetAllProducts.emit(null);
      }
    })
  }

  //low stock product must be less than 10 available
  lowStockProduct() {
    let countArray: any = [];

    this.products.forEach(element => {
      if (element.availableQuantity > 0 && element.availableQuantity < 10) {
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
      if (element.availableQuantity == 0) {
        countArray.push(element);
      }
    });

    return countArray.length;
  }

}
