import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router} from '@angular/router';
import { EstatusService } from '../../services/estatus.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls: ['./estatus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EstatusComponent implements OnInit {
  estatusServiceError:boolean=false;
  estatusForm: FormGroup;
  rowsFilter = [
    { firequestid: 'IN000000001', proyect: 'Abona y crece', product: 'Crédito', applicant:'Ruben Espindola'}
  ];
  rowsFilter2 = [
    { fistatusid: 1, fistatus: 'Solicitado'},{ fistatusid: 2, fistatus: 'Asignado'},{fistatusid: 3, fistatus: 'Proceso'},{fistatusid: 4, fistatus: 'Validación Sistemas'}
    ,{fistatusid: 5, fistatus: 'Validación Negocio'},{fistatusid: 6, fistatus: 'Certificación de Ingeniería'},{fistatusid: 7, fistatus: 'Certificación Estrategica'}
    ,{fistatusid: 8, fistatus: 'Publicación'},{fistatusid: 9, fistatus: 'Cancelado'},{fistatusid: 10, fistatus: 'Pospuesto'}
    ,{fistatusid: 11, fistatus: 'Terminado'}
  ];
  temp = [];
  temp2 = [];
  val;
 
  get f(){return this.estatusForm.controls;}
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private estatusService: EstatusService,
    public router: Router) { 
      
    this.temp = this.rowsFilter;
    this.temp2 = this.rowsFilter2;

    
  }

  ngOnInit() {
    this.estatusService.getRequestForStatus().subscribe( resp =>{
  
      //console.log("roles"+ JSON.stringify(resp.body));
      this.rowsFilter = resp.body;
      this.temp = this.rowsFilter;
   
    }, error => {
      console.error(error);
    });
   
    
  }


  
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.fcproyectname.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}
changeShape(shape){
 // console.log(shape.value);
  this.val=shape.value;
}
  updateStatusRequest(requestId) {
  // console.log("Entrando a  updateStatusRequest");
  // console.log("requestId="+requestId +" statusId="+this.val);
    this.estatusService.updateStatusRequest(requestId, this.val).subscribe(
      res => {
        this.router.navigate(["estatus","888899"]);
      },
      err => {
        console.log("Error en actualizar");
        this.estatusServiceError = true;
      }
    );
  }
  


}
