import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Assignment } from '../shared/assignment.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
 
@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private assignmentUrl= 'http://10.51.33.63:8081/request/';
  
  constructor(private http: HttpClient) { }

  getAssignment(): Observable<Response>{
    console.log("Invocando servicio de getRequest url="+this.assignmentUrl+"getRequest");
    return this.http
    .get<Response>(this.assignmentUrl+"getRequest",httpOptions)
    .pipe(
        tap((resp:Response) =>{
          
        }),
        catchError( error => Observable.throw(error)
      )
      )
      
  }
  getUserByRole(roleId:string): Observable<Response>{
    console.log("Invocando servicio de getUserByRole url="+this.assignmentUrl+"getUserByRol?roleId="+roleId);
    return this.http
    .get<Response>(this.assignmentUrl+"getUserByRol?roleId="+roleId,httpOptions)
    .pipe(
        tap((resp:Response) =>{
          
        }),
        catchError( error => Observable.throw(error)
      )
      )
      
  }

  updateBussinessAndCertificatorEngineer(assignment:Assignment): Observable<Response>{
  
      console.log("Invocando servicio de updateBussinessAndCertificatorEngineer url="+this.assignmentUrl+"updateBussinessAndCertificatorEngineer");
      let body = JSON.stringify(assignment);
      return this.http
      .post<Response>(this.assignmentUrl+"updateBussinessAndCertificatorEngineer",body,httpOptions)
      .pipe(
          tap((resp:Response) =>{
            
          if(resp.statusCode == 201){//Good login

            alert("assignment creado correctamente");
            
            }else{
            
            Observable.throw("Error al crear la assignment");
            
            } 
  
          }),
          catchError( error => Observable.throw(error)
        )
        )
        
    }
}
