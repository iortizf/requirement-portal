import { Injectable } from '@angular/core';
import { Applicant } from '../shared/request.model';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private submitedSource = new Subject<String>();

  submited = this.submitedSource.asObservable();
  currentForm: FormGroup;


  constructor() { }

  confirmSubmit(tab:string){
    this.submitedSource.next(tab);    
  }

  confirmForm(form: FormGroup){

  }
}
