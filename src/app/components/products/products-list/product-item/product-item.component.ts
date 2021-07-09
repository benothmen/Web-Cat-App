import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {ActionEvent, ProductActionsTypes} from '../../../../state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product|null=null
  @Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>()
  constructor() { }

  ngOnInit(): void {
  }


  onSelect(product: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCTS,payload:product})
  }

  onDelete(product: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCTS,payload:product})
  }

  onEdit(product: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCTS,payload:product})
  }
}
