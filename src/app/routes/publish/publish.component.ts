import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PublishService } from '../../services/publish.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublishComponent implements OnInit {

  rowsFilter = [
    { id: 'INF001', proyect: 'Migración core bancario', description: 'Migración del core bancario de Banco Azteca', status:'Certificación' , accion:'Listo' },
    { id: 'INF002', proyect: 'Gobierno de Microservicios', description: 'Desarrollo de microservicios de Banco Azteca', status:'Certificación', accion:'Listo'},
    { id: 'INF003', proyect: 'Migración de CLICEL', description: 'Migración de CLICEL a TIBCO', status:'Certificación', accion:'Listo'},
    { id: 'INF004', proyect: 'Migración SPEI', description: 'Migración SPEI de servidores', status:'Certificación', accion:'Listo'},
    { id: 'INF005', proyect: 'BATCH captación', description: 'Mapeo de BATCH captación', status:'Certificación', accion:'Listo'}
  ];

  temp = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private publishService:PublishService) { 
    this.temp = this.rowsFilter;
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.publishService.obtenerDatos(1, user.fiuserid).subscribe(
      resp =>{
        console.log("Publish Data", resp);
        
      },
      error=>{
        console.error(error);
      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.proyect.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}

}
