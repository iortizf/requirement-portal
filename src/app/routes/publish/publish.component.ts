import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublishComponent implements OnInit {

  rowsFilter = [
    { id: 'INF001', proyect: 'Migración core bancario', description: 'Migración del core bancario de Banco Azteca', status:'Certificación' },
    { id: 'INF002', proyect: 'Gobierno de Microservicios', description: 'Desarrollo de microservicios de Banco Azteca', status:'Certificación'},
    { id: 'INF003', proyect: 'Migración de CLICEL', description: 'Migración de CLICEL a TIBCO', status:'Certificación'},
    { id: 'INF004', proyect: 'Migración SPEI', description: 'Migración SPEI de servidores', status:'Certificación'},
    { id: 'INF005', proyect: 'BATCH captación', description: 'Mapeo de BATCH captación', status:'Certificación'}
  ];

  temp = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() { 
    this.temp = this.rowsFilter;
  }

  ngOnInit() {
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
