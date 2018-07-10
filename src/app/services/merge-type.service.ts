import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { MergeType } from "../shared/catalog.model";
import { backEndUrl } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MergeTypeService {

  private loginUrl = backEndUrl;

  constructor(private http: HttpClient) { }

  getMergeType(): Observable<MergeType[]> {
    return this.http.get<MergeType>(this.loginUrl + "getLevelMergeType")
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
