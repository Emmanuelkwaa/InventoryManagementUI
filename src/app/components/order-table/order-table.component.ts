import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  @Input() width: string = '';

  displayedColumns: string[] = ['customer.lastName', 'product.name', 'quantity', 'totalCost', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog :MatDialog, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders()
      .subscribe({
        next: (result: Order[]) => {
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(result);
        },
        error: (err) => {
          alert("Unable to get all orders");
        },
      });
  }
  
  editOrder(row :Order) {
    this.dialog.open(OrderDialogComponent, {
      width: this.width,
      data:row
    }).afterClosed().subscribe(val => {
      if(val==="updated") {
        this.getAllOrders();
      }
    })
  }

  deleteOrder(id :number) {
    this.orderService.deleteOrder(id)
    .subscribe({
      next : (res :any) => {
        alert(res.message);
        this.getAllOrders();
      },
      error: (err) => {
        alert("Unable to delete");
      }
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
