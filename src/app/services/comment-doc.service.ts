import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backEndUrl, CustomError, contentTypeJson } from '../shared/constants';
import { map } from 'rxjs/operators';
import { Response } from '../shared/response.model';
import { CommentDocument } from '../shared/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentDocService {

  constructor(private http: HttpClient) { }

  addCommentToDoc(comment: CommentDocument): Observable<void> {
    return this.http
      .post<void>(backEndUrl + "addCommentDocument", comment, contentTypeJson)
      .pipe(
        map((resp: Response) => {
          console.log("Estatus = " + resp.statusCode);
          if (resp.statusCode !== 201)
            throw new CustomError("CommentDocService.addCommentToDoc()", resp.errors);
        })
      )

  }

}
