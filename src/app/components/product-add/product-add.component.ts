import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsComponent} from '../products/products.component';
import {ProductsService} from '../../Services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  submitted:boolean=false;

  constructor(private fb:FormBuilder,private productsService:ProductsService) { }

  productFormGroup=this.fb.group({
    name:["",Validators.required],
    price:[0,Validators.required],
    quantity:[0,Validators.required],
    selected:[true,Validators.required],
    available:[true,Validators.required]
  });
  ngOnInit(): void {
  }

  onSaveProduct() {
    this.submitted=true
    if (this.productFormGroup.invalid) return;
    this.productsService.save(this.productFormGroup.value).subscribe(data=>{
      alert("ok")
    })
  }
}
