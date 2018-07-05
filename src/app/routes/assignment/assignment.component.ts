import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router} from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../shared/assignment.model';

 

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignmentComponent implements OnInit {

  rowsFilter = [
    { firequestid: 'IN000000001', fcproyectname: 'Abona y crece', ficomplexityid: 'Crédito', fiproductid:'Ruben Espindola', fipriorityid:'Ruben Espindola'}
  ];

  temp = [];
  rowsFilter2 = [{fiuserid:2,fcname:'Jocsan',fclastname1:'Benito',fclastname2:'Luna'},{fiuserid:2,fcname:'Jocsan',fclastname1:'Benito',fclastname2:'Luna'}];
  temp2 = [];
  rowsFilter3 = [{fiuserid:2,fcname:'Jocsan',fclastname1:'Benito',fclastname2:'Luna'},{fiuserid:2,fcname:'Jocsan',fclastname1:'Benito',fclastname2:'Luna'}];
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

changeingenieroNegocio(shape) {

   console.log(shape.value);
   this.valingenieroNegocio=shape.value;
 }

 changeingenieroCertificador(shape1) {

  console.log(shape1.value);
  this.valingenieroCertificador=shape1.value;
}


 updateBussinessAndCertificatorEngineer(firequestid:number,   assignment:Assignment) {
        console.log("Haciendo updateBussinessAndCertificatorEngineer");
        console.log(firequestid);
        var stringForm = firequestid.toString();
        var requestid = this.rowsFilter.find(x=>x.firequestid == stringForm).fcproyectname;
        var complexityid = this.rowsFilter.find(x=>x.firequestid == stringForm).ficomplexityid;
        var productid = this.rowsFilter.find(x=>x.firequestid == stringForm).fiproductid;
        var priorityid = this.rowsFilter.find(x=>x.firequestid == stringForm).fipriorityid;
      
        assignment.firequestid = firequestid;
        assignment.fcbusisnessengineer="JOCSAN";
        assignment.fiuseridbe= this.valingenieroNegocio;
        assignment.fccertificatedengineer="JOSE";
        assignment.fiuseridce=this.valingenieroCertificador;
        assignment.ficomplexityid=Number(complexityid);
        assignment.fiproductid=Number(productid);
        assignment.fipriorityid=Number(priorityid);

        console.log( assignment.firequestid);
        console.log(assignment.fcbusisnessengineer);
        console.log(assignment.fiuseridbe);
        console.log(assignment.fccertificatedengineer);
        console.log(assignment.fiuseridce);
        console.log(assignment.ficomplexityid);
        console.log(assignment.fiproductid);
        console.log(assignment.fipriorityid);
        
        
        this.assignmentService.updateBussinessAndCertificatorEngineer(assignment).subscribe(
          res => {
          
            this.router.navigate(["assignment","888899"]);
          
          },
        
          err => {
            
        
          console.log("Error en login");  
            //this.loginError = true;
        }
        
    );
  }

}
