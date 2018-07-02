import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { Response } from '../shared/response.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl= 'http://10.51.145.32:8080/request/';
  
  constructor(private http: HttpClient) { }
  
  login(employId:string, pwd:string): Observable<Response> {
    console.log("Invocando servicio de login url="+this.loginUrl+"getUserLogin?userId="+employId+"&pass="+pwd);
    return this.http
    .get<Response>(this.loginUrl+"getUserLogin?userId="+employId+"&pass="+pwd, httpOptions)
    .pipe(
        tap((resp:Response) =>{
          console.log(resp);
          if(resp.statusCode == 200){//Good login
            localStorage.setItem('currentUser', JSON.stringify(resp.body[0]));
          }else{
            Observable.throw("El usuario o contraseña son incorrectos");
          }          
        }),
        catchError( error => Observable.throw(error))
      )
  } 

  logout() {
    localStorage.removeItem('currentUser');
  }


}
