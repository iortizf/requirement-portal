import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { RequestType } from "../shared/catalog.model";
import { backEndUrl } from '../shared/constants';


@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  private loginUrl = backEndUrl;

  constructor(private http: HttpClient) { }

  getRequestTypes(): Observable<RequestType[]> {
    return this.http.get<RequestType>(this.loginUrl + "getRequestType")
      .pipe(
        map((resp: Response) => {
          if (resp.statusCode == 200)
            return resp.body;
          else
            Observable.throw("Error al obtener los tipos de solicitud");
        }),
        catchError(error => Observable.throw(error))
      );
  }
}