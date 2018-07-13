import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs'
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Publish } from '../shared/publish.model';
import { backEndUrl, CustomError } from '../shared/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  private publishUrl= backEndUrl;

  constructor(private http: HttpClient) { }

  obtenerDatos(statusId:number, userId:number): Observable<Publish[]> {
    return this.http
    .get<Publish[]>(this.publishUrl+"getRequestByStatusAndRole?statusId="+statusId+"&userId="+userId, httpOptions)
    .pipe(
      map((resp:Response) => {
        if(resp.statusCode == 200)
          return resp.body;
        else
          throw new CustomError("PublishService.obtenerDatos()", resp.errors);
      }))
  } 
}
