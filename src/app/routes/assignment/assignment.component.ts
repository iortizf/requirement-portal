import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router} from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';

 

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentComponent implements OnInit {

  rowsFilter = [
    { firequestid: 'IN000000001', proyect: 'Abona y crece', product: 'Crédito', applicant:'Ruben Espindola'}
  ];

  temp = [];
  rowsFilter2 = [{fiuserid:2,fcname:'Jocsan',fclastname1:'Benito',fclastname2:'Luna'},{fiuserid:2,fcname:'Jocsan',fclastname1:'Benito',fclastname2:'Luna'}];
  temp2 = [];
  rowsFilter3 = [{fiuserid:2,fcname:'Jocsan',fclastname1:'Benito',fclastname2:'Luna'},{fiuserid:2,fcname:'Jocsan',fclastname1:'Benito',fclastname2:'Luna'}];
  temp3 = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private assignmentService: AssignmentService,
    public router: Router) { 
      
    this.temp = this.rowsFilter;
    this.temp2 = this.rowsFilter2;
    this.temp3 = this.rowsFilter3;
 
  }

  ngOnInit() {
    this.assignmentService.getAssignment().subscribe( resp =>{
  
     // console.log("roles"+ JSON.stringify(resp.body));
      this.rowsFilter = resp.body;
      this.temp = this.rowsFilter;
   
    }, error => {
      console.error(error);
    });
    this.assignmentService.getUserByRole("2").subscribe( resp2 =>{
  
     this.rowsFilter2 = resp2.body;
      this.temp2 = this.rowsFilter2;
  // console.log("roles"+ JSON.stringify(resp2.body));
    }, error => {
      console.error(error);
    });
    this.assignmentService.getUserByRole("3").subscribe( resp3 =>{
  
      this.rowsFilter3 = resp3.body;
       this.temp3 = this.rowsFilter3;
   // console.log("roles"+ JSON.stringify(resp2.body));
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
