import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import {ProductsService} from '../../Services/products.service';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../state/product.state';
import {Router} from '@angular/router';
import {Action} from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }
  onGetAllProducts(){
    this.products$=this.productsService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );

  }

  onGetSelectedProducts() {
    this.products$=this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$=this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSearch(value: any) {
    this.products$=this.productsService.searchProducts(value.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe(data=>{
      p.selected=!data.selected;
    })
  }

  onDelete(p: Product) {
    let v=confirm("Etes vours sure?")
    if(v==true)
    this.productsService.delete(p).subscribe(data=>{
      this.onGetAllProducts();
    })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break
      case ProductActionsTypes.NEW_PRODUCTS:this.onNewProduct();break
      case ProductActionsTypes.SELECT_PRODUCTS:this.onSelect($event.payload);break
      case ProductActionsTypes.DELETE_PRODUCTS:this.onDelete($event.payload);break
      case ProductActionsTypes.EDIT_PRODUCTS:this.onEdit($event.payload);break
    }
  }

}
