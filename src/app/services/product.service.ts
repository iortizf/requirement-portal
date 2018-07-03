import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Product } from "../shared/catalog.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private loginUrl= 'http://10.51.145.32:8080/request/';
  
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
