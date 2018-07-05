import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Priority } from "../shared/catalog.model";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private loginUrl = 'http://10.51.145.32:8080/request/';

  constructor(private http: HttpClient) { }

  getPriorities(): Observable<Priority[]> {
    return this.http.get<Priority>(this.loginUrl + "getPriority")
      .pipe(
        map((resp: Response) => {
          if (resp.statusCode == 200)
            return resp.body;
          else
            Observable.throw("Error al obtener el catálogo de prioridades");
        }),
        catchError(error => Observable.throw(error))
      );
  }
}
