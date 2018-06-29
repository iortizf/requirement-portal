import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-inf',
  templateUrl: './applicant-inf.component.html'
})
export class ApplicantInfComponent implements OnInit, OnDestroy {

  submitted: boolean = false;
  subscription: Subscription;
  applicanForm: FormGroup;

  constructor(private fb: FormBuilder,
    private requestService: RequestService) {

    this.applicanForm = this.requestService.currentForm;

    this.subscription = this.requestService.submited.subscribe(tab => {
      if(tab === "applicant-inf"){
        this.submitted = true
        this.requestService.currentForm = this.applicanForm;
      }
    });
    
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  get f(){return this.applicanForm.controls;}
}
