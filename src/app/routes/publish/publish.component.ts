import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PublishService } from '../../services/publish.service';
import { Publish } from '../../shared/publish.model'

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublishComponent implements OnInit {

  rowsFilter = [];

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
        this.rowsFilter = JSON.parse(JSON.stringify(resp));
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
        return d.fcproyectname.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}

}
