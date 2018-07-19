import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Publish } from '../shared/publish.model';
import { backEndUrl, CustomError, contentTypeJson } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  private publishUrl= backEndUrl;

  constructor(private http: HttpClient) { }

  obtenerDatos(statusId:number, userId:number): Observable<Publish[]> {
    return this.http
    .get<Publish[]>(this.publishUrl+"getRequestByStatusAndRole?statusId="+statusId+"&userId="+userId, contentTypeJson)
    .pipe(
      map((resp:Response) => {
        if(resp.statusCode == 200)
          return resp.body;
        else
          throw new CustomError("PublishService.obtenerDatos()", resp.errors);
      }))
  } 
}
