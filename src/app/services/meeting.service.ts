import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../shared/response.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Meeting } from '../shared/meeting.model';
import { backEndUrl } from '../shared/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private addMeetingUrl= backEndUrl+'createMeeting';
  private getRequestUrl = backEndUrl+'getRequest';
  private getMeetingsUrl = backEndUrl+'getMeeting';
  private updateMeetingUrl = backEndUrl+'updateMeeting';

  constructor(private http: HttpClient) { }

  createMeeting(meeting:Meeting): Observable<Response> {
    console.log("Invocando servicio de createMeeting="+this.addMeetingUrl);
    let body = JSON.stringify(meeting);
    return this.http
    .post<Response>(this.addMeetingUrl, body, httpOptions)
    .pipe(
        tap((resp:Response) =>{
          console.log(resp);
          if(resp.statusCode == 201){//Good login
            alert("meeting creado correctamente");
          }else{
            Observable.throw("Error al crear la reunion");
          }          
        }),
        catchError( error => Observable.throw(error))
      )
  } 

  updateMeeting(meeting:Meeting): Observable<Response> {
    console.log("Invocando servicio de updateMeeting="+this.updateMeetingUrl);
    let body = JSON.stringify(meeting);
    return this.http
    .post<Response>(this.updateMeetingUrl, body, httpOptions)
    .pipe(
        tap((resp:Response) =>{
          console.log(resp);
          if(resp.statusCode == 201){//Good login
            alert("meeting actualizado correctamente");
          }else{
            Observable.throw("Error al actualizar la reunion");
          }          
        }),
        catchError( error => Observable.throw(error))
      )
  } 

  loadRequest(): Observable<Response> {
    console.log("Invocando servicio de loadRequest="+this.getRequestUrl);
    return this.http
    .get<Response>(this.getRequestUrl, httpOptions)
    .pipe(
        tap((resp:Response) =>{
          console.log(resp);
          if(resp.statusCode == 200){//Good login
            console.log("Solicitudes cargadas correctamente");
            localStorage.setItem('solicitudes', JSON.stringify(resp.body));
          }else{
            Observable.throw("Error al cargar las solicitudes");
          }          
        }),
        catchError( error => Observable.throw(error))
      )
  } 

  getMeetings(): Observable<Meeting[]> {
    console.log("Invocando servicio de getMeetings="+this.getMeetingsUrl);
    return this.http
    .get<Meeting[]>(this.getMeetingsUrl, httpOptions)
    .pipe(
        map((resp:Response) =>{
          console.log(resp);
          if(resp.statusCode == 200){//Good login
            console.log("Reuniones cargadas correctamente");
            return resp.body;
          }else{
            Observable.throw("Error al cargar las reuniones");
          }          
        }),
        catchError( error => Observable.throw(error))
      )
  } 

}

