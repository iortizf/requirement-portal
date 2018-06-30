import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router} from '@angular/router';
import { EstatusService } from '../../services/estatus.service';


@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls: ['./estatus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EstatusComponent implements OnInit {

  rowsFilter = [
    { firequestid: 'IN000000001', proyect: 'Abona y crece', product: 'Crédito', applicant:'Ruben Espindola'}
  ];

  temp = [];
 
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private estatusService: EstatusService,
    public router: Router) { 
      
    this.temp = this.rowsFilter;

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

  

}
