import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProductsService {
  constructor(private Http: HttpClient){

  }
  getAllProducts():Observable<Product[]>{
    let host= environment.host;
    return this.Http.get<Product[]>(host+"/products");
  }
  getSelectedProducts():Observable<Product[]>{
    let host= environment.host;
    return this.Http.get<Product[]>(host+"/products?selected=true");
  }
  getAvailableProducts():Observable<Product[]>{
    let host= environment.host;
    return this.Http.get<Product[]>(host+"/products?available=true");
  }
  searchProducts(keyword:string):Observable<Product[]>{
    let host= environment.host;
    return this.Http.get<Product[]>(host+"/products?name_like="+keyword);
  }
  select(product:Product):Observable<Product>{
    let host= environment.host;
    product.selected=!product.selected;
    return this.Http.put<Product>(host+"/products/"+product.id,product);
  }
  delete(product:Product):Observable<void>{
    let host= environment.host;
    return this.Http.delete<void>(host+"/products/"+product.id);
  }
  save(product:Product):Observable<Product>{
    let host= environment.host;
    return this.Http.post<Product>(host+"/products",product);
  }
  getProduct(id?:number):Observable<Product>{
    let host= environment.host;
    return this.Http.get<Product>(host+"/products/"+id);
  }
  update(product:Product):Observable<Product>{
    let host= environment.host;
    return this.Http.put<Product>(host+"/products/"+product.id,product);
  }
}
