import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-proyect-desc',
  templateUrl: './proyect-desc.component.html'
})
export class ProyectDescComponent implements OnInit {
  submitted: boolean = false;
  subscription: Subscription;
  descriptionForm: FormGroup;

  constructor(private requestService: RequestService) {

    this.descriptionForm = this.requestService.currentForm;

    this.subscription = this.requestService.submited.subscribe(tab => {
      if(tab === "proyect-desc"){
        this.submitted = true
        this.requestService.currentForm = this.descriptionForm;
      }
    });
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  get f(){return this.descriptionForm.controls;}



}
