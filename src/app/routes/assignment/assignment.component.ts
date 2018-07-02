import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentComponent implements OnInit {

  rowsFilter = [
    { id: 'IN000000001', proyect: 'Abona y crece', product: 'Crédito', applicant:'Ruben Espindola'},
    { id: 'IN000000002', proyect: 'Dias de las madres', product: 'Guardadito', applicant:'Nayeli Geogina'},
    { id: 'IN000000002', proyect: 'Dia del padre', product: 'Guardadito', applicant:'Nayeli'},
    { id: 'IN000000002', proyect: 'Proyecto piloto', product: 'Guardadito piloto', applicant:'Alison'}
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
