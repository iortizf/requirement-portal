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
export class PublishService {

  private publishUrl= 'http://localhost:8080/request/';

  constructor(private http: HttpClient) { }

  obtenerDatos(statusId:number, userId:number): Observable<Response> {
    return this.http
    .get<Response>(this.publishUrl+"getRequestByStatusAndRole?statusId="+statusId+"&userId="+userId, httpOptions)
    .pipe(
        tap((resp:Response) =>{
        }),
      )
  } 
}
