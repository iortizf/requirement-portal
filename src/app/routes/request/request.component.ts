import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tab } from '../../shared/request.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  providers: [RequestService]
})
export class RequestComponent implements OnInit {

  currentTab: string;

  tabs: Tab[] = [
    new Tab("applicant-inf", 0),
    new Tab("request-inf", 1),
    new Tab("request-desc", 2),
    new Tab("proyect-desc", 3)
  ];
  requestForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router, private fb: FormBuilder,
    private requestService: RequestService) {    

    this.tabs[0].form = this.requestService.currentForm = fb.group({
      noEmploy: [null, Validators.required],
      name: [null, Validators.required],
      apellidos: [null, Validators.required],
    });

    this.tabs[1].form = fb.group({
      pname: [null, Validators.required],
      product: [null, Validators.required],
      company: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.tabs[2].form = fb.group({
      requestype: [null, Validators.required],
      priority: [null, Validators.required],
      complex: [null, Validators.required],
      business: [null, Validators.required],
      entregable: [null, Validators.required],
      deptos : []
    });

    this.tabs[3].form = fb.group({
      description: [null, Validators.required]
    });


    this.currentTab = "applicant-inf";
    this.router.navigate(["/request"]);
      
  }


  ngOnInit() {

  }

  back() {
    this.currentTab = this.route.snapshot.firstChild.url[0].path;
    let tab = this.tabs.find(tab => tab.name == this.currentTab);
    if (tab.index != 0) {
      let backTo = this.tabs[tab.index - 1];
      this.tabs[tab.index].form = this.requestService.currentForm;
      this.requestService.currentForm = backTo.form;
      this.router.navigate([backTo.name], { relativeTo: this.route });
      this.currentTab = backTo.name;
    }
  }

  next() {

    this.currentTab = this.route.snapshot.firstChild.url[0].path;
    this.requestService.confirmSubmit(this.currentTab);

    console.log("Estatus del form = " + this.requestService.currentForm.valid);
    console.log(this.requestService.currentForm.value);

    let tab = this.tabs.find(tab => tab.name == this.currentTab);

    if (this.requestService.currentForm.valid && tab.index < 3) {
      let nextTab = this.tabs[tab.index + 1];
      console.log("CurrentIndex " + tab.index + ", Navegando a = " + nextTab.name);
      console.log("Setting the current form")
      this.tabs[tab.index].form = this.requestService.currentForm;
      this.requestService.currentForm = nextTab.form;
      this.router.navigate([nextTab.name], { relativeTo: this.route });
      this.currentTab = nextTab.name;
    }
    console.log("Current data", this.tabs);
  }

}
