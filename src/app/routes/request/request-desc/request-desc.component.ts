import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { RequestService } from '../../../services/request.service';
import { RequestTypeService } from '../../../services/request-type.service';
import { RequestType , Priority, Complex, MergeType} from "../../../shared/catalog.model";
import { PriorityService } from '../../../services/priority.service';
import { ComplexService } from '../../../services/complex.service';
import { MergeTypeService } from '../../../services/merge-type.service';

@Component({
  selector: 'app-request-desc',
  templateUrl: './request-desc.component.html'
})
export class RequestDescComponent implements OnInit {

  submitted: boolean = false;
  subscription: Subscription;
  reqdescForm: FormGroup;
  requestTypes = new Array<RequestType>();
  priorities = new Array<Priority>();
  complex = new Array<Complex>();
  mergeTypes = new Array<MergeType>();

  constructor(private requestService: RequestService,
  private requestTypeService:RequestTypeService,
  private priorityService:PriorityService,
  private complexService:ComplexService,
  private mergeTypeService:MergeTypeService) {

    this.reqdescForm = this.requestService.currentForm;

    this.subscription = this.requestService.submited.subscribe(tab => {
      if(tab === "request-desc"){
        this.submitted = true
        this.requestService.currentForm = this.reqdescForm;
      }
    });
    
  }

  ngOnInit() {
    this.requestTypeService.getRequestTypes().subscribe(resp =>{
      this.requestTypes = resp;
    });

    this.priorityService.getPriorities().subscribe(resp =>{
      this.priorities = resp;
    });

    this.complexService.getComplex().subscribe(resp =>{
      this.complex = resp;
    });

    this.mergeTypeService.getMergeType().subscribe(resp =>{
      this.mergeTypes = resp;
    });

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  
  get f(){return this.reqdescForm.controls;}
}
