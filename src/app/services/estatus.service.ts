import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { Body } from '@angular/http/src/body';
import { backEndUrl, CustomError } from '../shared/constants';
import { Status } from '../shared/status.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EstatusService {

  constructor(private http: HttpClient) { }



  getRequestForStatus(): Observable<Status[]> {

    return this.http
      .get<Status[]>(backEndUrl + "getRequestForStatus")
      .pipe(
        map((resp: Response) => {
          if (resp.statusCode !== 200)
            throw new CustomError("EstatusService.getRequestForStatus()", resp.errors);
          else
            return resp.body;
        })
      )
  }


  updateStatusRequest(requestId: number, statusId: number): Observable<void> {

    return this.http
      .post<void>(backEndUrl + "updateStatusRequest?requestId=" + requestId + "&statusId=" + statusId, "")
      .pipe(
        map((resp: Response) => {
          console.log("Estatus = "+resp.statusCode);
          if (resp.statusCode !== 201)
            throw new CustomError("AssignmentService.updateBeAndCertEngineer()", resp.errors);
        })
      )

  }
}
