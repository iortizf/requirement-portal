import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { backEndUrl } from '../shared/constants';
import { Tracing } from '../shared/tracing.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TracingService {

  private publishUrl= backEndUrl;

  constructor(private http: HttpClient) { }

  getDataOfTracing(): Observable<Tracing[]> {
    return this.http
    .get<Tracing[]>(this.publishUrl+"getStatusRequestByBussinesEngineer", httpOptions)
    .pipe(
      map((resp:Response) => {
        if(resp.statusCode == 200)          
          return resp.body;
        else
          Observable.throw("Error al obtener los seguimientos"); 
      }),
      catchError( error => Observable.throw(error))
      );
  } 
}
