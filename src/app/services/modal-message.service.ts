import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalData } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ModalMessageService {

  private modalMsgSource = new Subject<ModalData>();

  modalMsg = this.modalMsgSource.asObservable();

  constructor() { }

  showModalMessage(mmsg:ModalData){
    this.modalMsgSource.next(mmsg);
  }  
}
