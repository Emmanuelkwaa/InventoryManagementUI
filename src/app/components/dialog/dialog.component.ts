import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productForm! : FormGroup;
  constructor(private formBuilder :FormBuilder, private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName :['', Validators.required],
      category :['', Validators.required],
      price :['', Validators.required],
      quantity :['', Validators.required],
      details :['', Validators.required],
    })
  }

  addProduct() {
    console.log(this.productForm.value);
  }

}
