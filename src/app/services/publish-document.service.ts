import { Injectable } from '@angular/core';
import { Publish } from '../shared/publish.model';

@Injectable({
  providedIn: 'root'
})
export class PublishDocumentService {

  publishSelected:Publish;

  constructor() { }

  getPublish():Publish{
    return this.publishSelected;
  }
}
