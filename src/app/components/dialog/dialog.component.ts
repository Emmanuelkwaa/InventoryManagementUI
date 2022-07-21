import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  categories: Category[] = [];
  category: Category = new Category();
  actionButton: string = "Create";
  productForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductServiceService,
    private categoryService: CategoryServiceService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Product,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      details: ['', Validators.required],
    });

    this.categoryService.getAllCategories()
      .subscribe((result: Category[]) => (this.categories = result));

    console.log(this.editData)

    if (this.editData) {
      this.actionButton = "Update";
      this.productForm.controls['productName'].setValue(this.editData.name);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['category'].setValue(this.editData.category.name);
      this.productForm.controls['details'].setValue(this.editData.details);
      this.productForm.controls['quantity'].setValue(this.editData.availableQuantity);
    }

  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        let product = new Product();
        product.name = this.productForm.controls['productName'].value;
        product.price = this.productForm.controls['price'].value;
        product.category.id = parseInt(this.productForm.controls['category'].value);
        product.details = this.productForm.controls['details'].value;
        product.availableQuantity = this.productForm.controls['quantity'].value;

        this.productService.createProduct(product)
          .subscribe({
            next: (res) => {
              alert("Product added successfully");
              this.productForm.reset();
              this.dialogRef.close('add');
            },
            error: (err) => {
              alert(err.message);
            }
          });
        console.log(product)
      } else {
        this.updateProduct()
      }
    }
  }

  updateProduct() {
    let product = new Product();
    product.name = this.productForm.controls['productName'].value;
    product.price = this.productForm.controls['price'].value;
    product.category.id = parseInt(this.productForm.controls['category'].value);
    product.details = this.productForm.controls['details'].value;
    product.availableQuantity = this.productForm.controls['quantity'].value;

    this.productService.updateProduct(product)
      .subscribe({
        next: (res) => {
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('add');
        },
        error: (err) => {
          alert(err.message);
        }
      });
  }

}
