import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../shared/document.model';
import { backEndUrl, CustomError, contentTypeJson } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { FileUploader } from 'ng2-file-upload';

const URI = "http://10.51.145.32:8080/request/uploadFile";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocuments(requestId:number):Observable<Document[]>{
    return this.http
      .get<Document[]>(backEndUrl + "getDocuments?requestId="+requestId, contentTypeJson)
      .pipe(
        map((resp: Response) => {
          if (resp.statusCode == 200)
            return resp.body.map((document:Document)=>{
              document.uploader = new FileUploader( { url:  URI});
              return document;
            });
          else
            throw new CustomError("DocumentService.getDocuments()", resp.errors);
        })
      )
  }
}
