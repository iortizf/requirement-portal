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
    /*let user = JSON.parse(sessionStorage.getItem("currentUser"));
    
    this.applicanForm.value.name = user.fcname;
    this.applicanForm.value.apellidos = user.fclastname1 + " "+ user.fclastname2;
    this.applicanForm.value.position = user.fcposition;
    this.applicanForm.value.boss = user.fcimmediatboss;
    this.applicanForm.value.depto = user.fcdepartment;
    this.applicanForm.value.direction = user.fcadress;
    this.applicanForm.value.email = user.fcemail;
    this.applicanForm.value.phone1 = user.fcextention;
    this.applicanForm.value.phone2 = user.ficellphone;    

    console.log("applicant form ", this.applicanForm.value);*/
  }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem("currentUser"));
    this.applicanForm.setValue({
        noEmploy:user.fiuserid,
        name : user.fcname,
        apellidos:user.fclastname1 + " "+ user.fclastname2,
        position : user.fcposition,
        boss : user.fcimmediatboss,
        depto : user.fcdepartment,
        direction : user.fcadress,
        email : user.fcemail,
        phone1 : user.fcextention,
        phone2 : user.ficellphone
     });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  get f(){return this.applicanForm.controls;}
}
