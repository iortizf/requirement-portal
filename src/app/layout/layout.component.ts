import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalMessageService } from '../services/modal-message.service';
import { Subscription } from 'rxjs';
import { MODAL_ERROR, MODAL_SUCCESS } from '../shared/constants';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('errorframe') public errorframe;
  @ViewChild('successframe') public successframe;
  subscription: Subscription;
  messages:string[];
  singleMessage:string;
  navigateTo:string;

  constructor(public router: Router,private modalMessageService: ModalMessageService) {
    this.subscription = this.modalMessageService.modalMsg.subscribe(
      modalMessage => {
        console.log("Recibiendo datos", modalMessage);
        this.navigateTo = modalMessage.navigateTo;
        if (modalMessage.type === MODAL_ERROR){
          this.messages = modalMessage.messages;          
          this.errorframe.show();
        } else if(modalMessage.type === MODAL_SUCCESS){
          this.singleMessage = modalMessage.messages[0];
          this.successframe.show();
          setTimeout(()=>{
            this.successframe.hide();
          },4000)
        }
      }
    );
  }

  ngOnInit() {

  }

  navigate(){    
    console.log("Navegando a "+this.navigateTo);
    this.router.navigate([this.navigateTo]);
    this.errorframe.hide();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
