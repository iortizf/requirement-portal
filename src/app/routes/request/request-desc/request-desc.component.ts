import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-request-desc',
  templateUrl: './request-desc.component.html'
})
export class RequestDescComponent implements OnInit {

  submitted: boolean = false;
  subscription: Subscription;
  reqdescForm: FormGroup;

  constructor(private requestService: RequestService) {

    this.reqdescForm = this.requestService.currentForm;

    this.subscription = this.requestService.submited.subscribe(tab => {
      if(tab === "request-desc"){
        this.submitted = true
        this.requestService.currentForm = this.reqdescForm;
      }
    });
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  
  get f(){return this.reqdescForm.controls;}
}
