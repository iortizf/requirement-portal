import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TracingComponent implements OnInit {
  rowsFilter = [
    { ing: 'Alison Guadalupe Gonzales Esquivel', fAtentions:'6', ftotal: '6', disp: '9', strategy:'2', cancel:'0', postponed:'0', finished:'0' },
    { ing: 'Graciela Ibeth Ramirez Tellez', fAtentions:'6', ftotal: '6', disp: '9', strategy:'2', cancel:'0', postponed:'0', finished:'0' },
    { ing: 'Graciela Ibeth Ramirez Tellez', fAtentions:'6', ftotal: '6', disp: '9', strategy:'2', cancel:'0', postponed:'0', finished:'0' },
    { ing: 'Jocsan Esau Benito Luna', fAtentions:'6', ftotal: '6', disp: '9', strategy:'2', cancel:'0', postponed:'0', finished:'0' },
    { ing: 'Miguel Angel Jimenez Huerta', fAtentions:'6', ftotal: '6', disp: '9', strategy:'2', cancel:'0', postponed:'0', finished:'0' }
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
        return d.ing.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}
}
