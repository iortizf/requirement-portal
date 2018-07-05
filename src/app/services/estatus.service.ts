import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Body } from '@angular/http/src/body';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
 
@Injectable({
  providedIn: 'root'
})
export class EstatusService {
  private assignmentUrl= 'http://10.51.33.63:8081/request/';
  
  constructor(private http: HttpClient) { }


  
    getRequestForStatus(): Observable<Response>{
    //  console.log("Invocando servicio de getRequestForStatus url="+this.assignmentUrl+"getRequestForStatus");
      return this.http
      .get<Response>(this.assignmentUrl+"getRequestForStatus")
      .pipe(
          tap((resp:Response) =>{
            
          }),
          catchError( error => Observable.throw(error)
        )
        )
        
    }

  
    updateStatusRequest(requestId:string, statusId:string): Observable<Response>{
  
    //  console.log("Invocando servicio de updateStatusRequest url="+this.assignmentUrl+"updateStatusRequest?requestId="+requestId+"&statusId="+statusId);
      return this.http
      .post<Response>(this.assignmentUrl+"updateStatusRequest?requestId="+requestId+"&statusId="+statusId,"")
      .pipe(
          tap((resp:Response) =>{
            
          }),
          catchError( error => Observable.throw(error)
        )
        )
        
    }
}
