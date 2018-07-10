import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { backEndUrl } from '../shared/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TracingService {

  private publishUrl= backEndUrl;

  constructor(private http: HttpClient) { }

  obtenerDatosSeguimiento(): Observable<Response> {
    return this.http
    .get<Response>(this.publishUrl+"getStatusRequestByBussinesEngineer", httpOptions)
    .pipe(
        tap((resp:Response) =>{
        }),
      )
  } 
}
