import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestService } from '../../../services/request.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/catalog.model';

@Component({
  selector: 'app-request-inf',
  templateUrl: './request-inf.component.html'
})
export class RequestInfComponent implements OnInit {

  submitted: boolean = false;
  subscription: Subscription;
  requestForm: FormGroup;
  products = new Array<Product>();

  constructor(private requestService: RequestService, private productService:ProductService) {

    this.requestForm = this.requestService.currentForm;

    this.subscription = this.requestService.submited.subscribe(tab => {
      if(tab === "request-inf"){
        this.submitted = true
        this.requestService.currentForm = this.requestForm;
      }
    });
    
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(resp =>{
      this.products = resp;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  get f(){return this.requestForm.controls;}

}
