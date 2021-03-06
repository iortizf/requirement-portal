import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Response } from '../shared/response.model';
import { Assignment } from '../shared/assignment.model';
import { User } from '../shared/user.model';
import { backEndUrl, CustomError, contentTypeJson } from '../shared/constants';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAssignment(): Observable<Assignment[]> {
    console.log("Invocando servicio de getRequest url=" + backEndUrl + "getRequest");
    return this.http
      .get<Assignment[]>(backEndUrl + "getRequest", contentTypeJson)
      .pipe(
        map((resp: Response) => {
          if (resp.statusCode == 200)
            return resp.body;
          else
            throw new CustomError("AssignmentService.getAssignment()", resp.errors);
        })
      )
  }
  getUserByRole(roleId: number): Observable<User[]> {
    console.log("Invocando servicio de getUserByRole url=" + backEndUrl + "getUserByRol?roleId=" + roleId);
    return this.http
      .get<User[]>(backEndUrl + "getUserByRol?roleId=" + roleId, contentTypeJson)
      .pipe(
        map((resp: Response) => {
          if (resp.statusCode == 200)
            return resp.body;
          else
            throw new CustomError("AssignmentService.getUserByRole()", resp.errors);
        })
      )
  }

  updateBeAndCertEngineer(assignment: Assignment): Observable<void> {
    console.log("Invocando servicio de updateBeAndCertEngineer url=" + backEndUrl + "updateBussinessAndCertificatorEngineer");
    return this.http
      .post<void>(backEndUrl + "updateBussinessAndCertificatorEngineer", assignment, contentTypeJson)
      .pipe(
        map((resp: Response) => {
          console.log("Estatus = "+resp.statusCode);
          if (resp.statusCode !== 201)
            throw new CustomError("AssignmentService.updateBeAndCertEngineer()", resp.errors);
        })
      )

  }
}
