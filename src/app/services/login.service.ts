import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { backEndUrl } from '../shared/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl= backEndUrl;
  
  constructor(private http: HttpClient) { }
  
  login(employId:string, pwd:string): Observable<boolean> {
    console.log("Invocando servicio de login url="+this.loginUrl+"getUserLogin?userId="+employId+"&pass="+pwd);
    return this.http
    .get<boolean>(this.loginUrl+"getUserLogin?userId="+employId+"&pass="+pwd, httpOptions)
    .pipe(
        map((resp:Response) =>{
     //     console.log(resp);
          if(resp.statusCode == 200){//Good login
            sessionStorage.setItem('currentUser', JSON.stringify(resp.body[0]));
          }else{
            throw new Error("Usuario o contraseña incorrectos");
          }          
        })
      )
  } 

  logout() {
    sessionStorage.removeItem('currentUser');
  }


}
