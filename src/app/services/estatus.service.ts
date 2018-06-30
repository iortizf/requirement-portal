import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
 
@Injectable({
  providedIn: 'root'
})
export class EstatusService {
  private assignmentUrl= 'http://10.51.33.63:8080/request/';
  
  constructor(private http: HttpClient) { }

  getAssignment(): Observable<Response>{
    console.log("Invocando servicio de getEstatus url="+this.assignmentUrl+"getRequestForStatus");
    return this.http
    .get<Response>(this.assignmentUrl+"getRequestForStatus",httpOptions)
    .pipe(
        tap((resp:Response) =>{
          
        }),
        catchError( error => Observable.throw(error)
      )
      )
    }

  
    getRequestForStatus(): Observable<Response>{
      console.log("Invocando servicio de getRequestForStatus url="+this.assignmentUrl+"getRequestForStatus");
      return this.http
      .get<Response>(this.assignmentUrl+"getRequestForStatus")
      .pipe(
          tap((resp:Response) =>{
            
          }),
          catchError( error => Observable.throw(error)
        )
        )
        
    }
}
