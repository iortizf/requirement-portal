import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TracingService } from '../../services/tracing.service';
import { Tracing } from '../../shared/tracing.model';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TracingComponent implements OnInit {

  rowsFilter: Tracing[];
  temp: Tracing[];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private tracingService:TracingService) { 
    this.temp = this.rowsFilter;
  }

  ngOnInit() {
    this.tracingService.getDataOfTracing().subscribe(resp =>
    {
      this.rowsFilter = resp;
      this.temp = resp;
    },
    error=>{
      console.error(error);
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.fcname.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}
}
