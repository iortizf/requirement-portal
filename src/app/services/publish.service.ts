import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Publish } from '../shared/publish.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  private publishUrl= 'http://10.51.145.32:8080/request/';

  constructor(private http: HttpClient) { }

  obtenerDatos(statusId:number, userId:number): Observable<Publish> {
    return this.http
    .get<Publish>(this.publishUrl+"getRequestByStatusAndRole?statusId="+statusId+"&userId="+userId, httpOptions)
    .pipe(
      map((resp:Response) => {
        if(resp.statusCode == 200)
          return resp.body;
        else
          Observable.throw("Error al obtener los requerimientos"); 
      }),
      catchError( error => Observable.throw(error))
      )
  } 
}
