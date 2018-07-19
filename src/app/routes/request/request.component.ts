import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tab, NewRequest } from '../../shared/request.model';
import { ModalMessageService } from '../../services/modal-message.service';
import { ModalData, MODAL_ERROR, MODAL_SUCCESS } from '../../shared/constants';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  providers: [RequestService]
})
export class RequestComponent implements OnInit {

  currentTab: string;

  @ViewChild('modal') public modal;

  tabs: Tab[] = [
    new Tab("applicant-inf", 0),
    new Tab("request-inf", 1),
    new Tab("request-desc", 2),
    new Tab("proyect-desc", 3)
  ];
  requestForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router, private fb: FormBuilder,
    private requestService: RequestService,
    private modalMessageService:ModalMessageService) {

    this.tabs[0].form = this.requestService.currentForm = fb.group({
      noEmploy: [null, Validators.required],
      name: [null, Validators.required],
      apellidos: [null, Validators.required],
      position: [null, Validators.required],
      boss: [null, Validators.required],
      depto: [null, Validators.required],
      direction: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      phone1: [null, Validators.required],
      phone2: [null, Validators.required]
    });

    this.tabs[1].form = fb.group({
      pname: [null, Validators.required],
      product: [null, Validators.required],
      company: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
      system: [null, Validators.required],
      productOwner: [null, Validators.required],
      businessOwner: [null, Validators.required],
    });

    this.tabs[2].form = fb.group({
      requestype: [null, Validators.required],
      priority: [null, Validators.required],
      complex: [null, Validators.required],
      business: [null, Validators.required],
      entregable: [null, Validators.required],
      deptos: [null, Validators.required]
    });

    this.tabs[3].form = fb.group({
      description: [null, Validators.required]
    });


    this.currentTab = "applicant-inf";
    this.router.navigate(["/request"]);

  }


  ngOnInit() {

  }

  goTo(index: number) {

    console.log("goTo Cliked!!");
    let tabClicked = this.tabs[index];
    this.requestService.currentForm = tabClicked.form;
  }

  send() {    

    let requestInfo = this.tabs[1].form.value;// Request Information Page
    let requestDesc = this.tabs[2].form.value;// Request Description Page
    let proyectDesc = this.tabs[3].form.value;// Proyect Description Page

    let user = JSON.parse(sessionStorage.getItem("currentUser"));

    let newReq = new NewRequest();

    newReq.fiuserid = user.fiuserid;
    newReq.ficomplexityid = requestDesc.complex;
    newReq.fiproductid = requestInfo.product;
    newReq.firequesttypeid = requestDesc.requestype;
    newReq.filevelmergetypeid = requestDesc.business;
    newReq.fcproyectname = requestInfo.pname;
    newReq.fipriorityid = requestDesc.priority;
    newReq.fccompany = requestInfo.company;
    newReq.fccategory = requestInfo.category;
    newReq.fcproyectdefinition = proyectDesc.description;
    newReq.fcstageofafectation = requestDesc.business;
    newReq.fcddepartmentsinvolved = this.getDeptosString(requestDesc.deptos);
    newReq.fcproyectdescription = proyectDesc.description;
    newReq.fcproductowner = requestInfo.productOwner;
    newReq.fcsystemcharge = requestInfo.system;
    newReq.fcbusinessowner = requestInfo.businessOwner;

    this.requestService.newRequest(newReq).subscribe(
      resp => {
        this.router.navigate(["/"]);
        this.modalMessageService.showModalMessage(new ModalData( MODAL_SUCCESS, ["La solicitud se guardó correctamente"]));
      },
      error => {
        this.modal.hide();
        console.error("Error al guardar la solicitud!");
        if(error.errors)
          this.modalMessageService.showModalMessage(new ModalData( MODAL_ERROR, error.errors));
      });
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
    } else if (this.requestService.currentForm.valid) {
      //Finishing
      //Validate forms
      let invalidForm = this.tabs.find(tab => tab.form.invalid === true);
      if (invalidForm) {//Someone form is invalid
        console.log("Favor de capturar los datos obligatorios del apartado " + invalidForm.name);
        this.router.navigate([invalidForm.name], { relativeTo: this.route });
      } else {
        this.modal.show();
      }
    }
  }

  getDeptosString(deptos) {
    let deptostrn: string;
    deptos.forEach(element => {
      deptostrn += element.value + " ";
    });
    return deptostrn;
  }

}
