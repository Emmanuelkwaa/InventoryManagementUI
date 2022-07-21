import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductServiceService } from 'src/app/services/product-service.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];

  displayedColumns: string[] = ['name', 'price', 'category.name', 'availableQuantity', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog :MatDialog, private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getAllProducts();

  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe({
        next: (result: Product[]) => {
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
          console.log(result);
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }

  editProduct(row :Product) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data:row
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
