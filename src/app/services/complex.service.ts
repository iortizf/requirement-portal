import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Complex } from "../shared/catalog.model";
import { backEndUrl } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ComplexService {

  private loginUrl = backEndUrl;

  constructor(private http: HttpClient) { }

  getComplex(): Observable<Complex[]> {
    return this.http.get<Complex>(this.loginUrl + "getComplexity")
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
