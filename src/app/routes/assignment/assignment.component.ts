import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router} from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../shared/assignment.model';
import { User } from '../../shared/user.model';

 

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AssignmentComponent implements OnInit {

  rowsFilter: Assignment[];

  temp = [];

  rowsFilter2 : User[];
  temp2 = [];
  rowsFilter3 : User[];
  temp3 = [];

  valingenieroNegocio;
  valingenieroCertificador;
  selectedType;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private assignmentService: AssignmentService,
    public router: Router) { 
      
    this.temp = this.rowsFilter;
    
    this.temp2 = this.rowsFilter2;
    this.temp3 = this.rowsFilter3;
 
  }

  ngOnInit() {
    this.assignmentService.getAssignment().subscribe( resp =>{
      this.rowsFilter = resp;
      this.temp = this.rowsFilter;   
    }, error => {
      console.error(error);
    });

    this.assignmentService.getUserByRole(2).subscribe( resp2 =>{
  
     this.rowsFilter2 = resp2;
      this.temp2 = this.rowsFilter2;
  // console.log("roles"+ JSON.stringify(resp2.body));
    }, error => {
      console.error(error);
    });
    this.assignmentService.getUserByRole(3).subscribe( resp3 =>{
  
      this.rowsFilter3 = resp3;
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

changeingenieroNegocio(shape) {

   console.log(shape.value);
   this.valingenieroNegocio=shape.value;
 }

 changeingenieroCertificador(shape1) {

  console.log(shape1.value);
  this.valingenieroCertificador=shape1.value;
}


updateAssignment(assignmentSelected:Assignment) {
        console.log("Haciendo updateBussinessAndCertificatorEngineer");
        console.log("Assigment selected ",assignmentSelected);        
  }

}
