import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { EstatusService } from '../../services/estatus.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../shared/status.model';
import { ModalMessageService } from '../../services/modal-message.service';
import { ModalData, MODAL_SUCCESS, MODAL_ERROR } from '../../shared/constants';


@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EstatusComponent implements OnInit {

  statusList: Status[];
  status = [
    { fistatusid: 1, fistatus: 'Solicitado' },
    { fistatusid: 2, fistatus: 'Asignado' },
    { fistatusid: 3, fistatus: 'Proceso' },
    { fistatusid: 4, fistatus: 'Validación Sistemas' },
    { fistatusid: 5, fistatus: 'Validación Negocio' },
    { fistatusid: 6, fistatus: 'Certificación de Ingeniería' },
    { fistatusid: 7, fistatus: 'Certificación Estrategica' },
    { fistatusid: 8, fistatus: 'Publicación' },
    { fistatusid: 9, fistatus: 'Cancelado' },
    { fistatusid: 10, fistatus: 'Pospuesto' },
    { fistatusid: 11, fistatus: 'Terminado' }
  ];

  temp = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private estatusService: EstatusService,
    private modalMessageService:ModalMessageService,
    public router: Router) {
    this.temp = this.statusList;
  }

  ngOnInit() {
    this.estatusService.getRequestForStatus().subscribe(statusList => {
      this.statusList = statusList;
      this.temp = this.statusList;
    }, error => {
      console.error(error);
    });
  }



  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.fcproyectname.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.statusList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateStatusRequest(requestId:number, statusId:number) {
    this.estatusService.updateStatusRequest(requestId, statusId).subscribe(
      () => {
        this.modalMessageService.showModalMessage(
          new ModalData(MODAL_SUCCESS, ["El status del folio "+ requestId+" se actualizó correctamente"], "status")
        );
      },
      error => {
        console.error(error)
        if (error.errors)
          this.modalMessageService.showModalMessage(
            new ModalData(MODAL_ERROR, error.errors, "status")
          );
        else
          this.modalMessageService.showModalMessage(
            new ModalData(MODAL_ERROR, [error.status + "-" + error.message], "status")
          );
      }
    );
  }



}
