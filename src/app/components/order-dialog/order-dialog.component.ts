import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  orderForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Order,
  ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      totalCost: ['', Validators.required],
    });

    console.log(this.editData)

    if (this.editData) {
      this.orderForm.controls['firstName'].setValue(this.editData.customer.firstName);
      this.orderForm.controls['lastName'].setValue(this.editData.customer.lastName);
      this.orderForm.controls['email'].setValue(this.editData.customer.email);
      this.orderForm.controls['product'].setValue(this.editData.product.name);
      this.orderForm.controls['product'].disable();
      this.orderForm.controls['quantity'].setValue(this.editData.quantity);
      this.orderForm.controls['totalCost'].setValue(this.editData.totalCost);
    }

  }

  updateOrder() {
    let order = new Order();
    order.id = this.editData.id;
    order.customer.id = this.editData.customer.id;
    order.customer.firstName = this.orderForm.controls['firstName'].value;
    order.customer.lastName = this.orderForm.controls['lastName'].value;
    order.customer.email = this.orderForm.controls['email'].value;
    order.product.id = this.editData.product.id;
    order.quantity = this.orderForm.controls['quantity'].value;
    order.totalCost = this.orderForm.controls['totalCost'].value;

    this.orderService.updateOrder(order)
      .subscribe({
        next: (res) => {
          alert("Order updated successfully");
          this.orderForm.reset();
          this.dialogRef.close('updated');
        },
        error: (err) => {
          alert(err.message);
        }
      });
  }

}
