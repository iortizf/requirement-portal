import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { NewRequest } from '../shared/request.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { backEndUrl } from '../shared/constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private loginUrl = backEndUrl;

  private submitedSource = new Subject<String>();

  submited = this.submitedSource.asObservable();
  currentForm: FormGroup;


  constructor(private http: HttpClient) { }

  confirmSubmit(tab: string) {
    this.submitedSource.next(tab);
  }

  newRequest(newReq: NewRequest) : Observable<boolean>{
    console.log("Newn Request Data", newReq);
    console.log("Invocando servicio de login url=" + this.loginUrl+"postNewRequest");
    return this.http.post<boolean>(this.loginUrl + "postNewRequest", newReq, httpOptions)
      .pipe(
        tap((resp: Response) => {
          console.log(resp);
          if (resp.statusCode != 201) {//Validate error
            Observable.throw("Error al guardar los datos \n Detalles \n " + resp.errors.toString() );
          }
        }),
        catchError(error => Observable.throw(error))
      )
  }
}
