import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Product } from "../shared/catalog.model";
import { backEndUrl } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private loginUrl= backEndUrl;
  
  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product>(this.loginUrl+"getProducto")
    .pipe(
      map((resp:Response) => {
        if(resp.statusCode == 200)
          return resp.body;
        else
          Observable.throw("Error al obtener los productos"); 
      }),
      catchError( error => Observable.throw(error))
    );
  }
}
