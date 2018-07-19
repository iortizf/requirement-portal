import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { backEndUrl, CustomError, contentTypeJson } from '../shared/constants';
import { Tracing } from '../shared/tracing.model';

@Injectable({
  providedIn: 'root'
})
export class TracingService {

  private publishUrl= backEndUrl;

  constructor(private http: HttpClient) { }

  getDataOfTracing(): Observable<Tracing[]> {    
    return this.http
    .get<Tracing[]>(this.publishUrl+"getStatusRequestByBussinesEngineer", contentTypeJson)
    .pipe(
      map((resp:Response) => {
        console.log("Response", resp);
        if(resp.statusCode == 200)          
          return resp.body;
        else
        throw new CustomError("PublishService.obtenerDatos()", resp.errors); 
      })
    );
  } 
}
