import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestService } from '../../../services/request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-inf',
  templateUrl: './request-inf.component.html'
})
export class RequestInfComponent implements OnInit {

  submitted: boolean = false;
  subscription: Subscription;
  requestForm: FormGroup;

  constructor(private requestService: RequestService) {

    this.requestForm = this.requestService.currentForm;

    this.subscription = this.requestService.submited.subscribe(tab => {
      if(tab === "request-inf"){
        this.submitted = true
        this.requestService.currentForm = this.requestForm;
      }
    });
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  get f(){return this.requestForm.controls;}

}
