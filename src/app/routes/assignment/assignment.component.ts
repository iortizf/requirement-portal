import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../shared/assignment.model';
import { User } from '../../shared/user.model';
import { ModalMessageService } from '../../services/modal-message.service';
import { MODAL_ERROR, ModalData, MODAL_SUCCESS } from '../../shared/constants';



@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AssignmentComponent implements OnInit {

  assignments: Assignment[];

  temp = [];

  usrBe: User[];
  usrCe: User[];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private assignmentService: AssignmentService,
    private modalMessageService:ModalMessageService,
    public router: Router) {
    this.temp = this.assignments;
  }

  ngOnInit() {

    this.assignmentService.getAssignment().subscribe(assignments => {
      this.assignments = assignments;
      this.temp = this.assignments;
    }, error => {
      console.error(error);
    });

    this.assignmentService.getUserByRole(2).subscribe(usrBe => {
      this.usrBe = usrBe;
    }, error => {
      console.error(error);
    });

    this.assignmentService.getUserByRole(3).subscribe(usrCe => {
      this.usrCe = usrCe;
    }, error => {
      console.error(error);
    });

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.fcproyectname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.assignments = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateAssignment(rowSelected: any) {
    console.log("Assigment selected ", rowSelected);
    if (rowSelected && rowSelected.negociousuario
      && rowSelected.certificadorusuario) {
      let updateAssigment = new Assignment();
      updateAssigment.firequestid = rowSelected.firequestid;
      updateAssigment.fiuseridbe = rowSelected.negociousuario;
      updateAssigment.fiuseridce = rowSelected.certificadorusuario;
      updateAssigment.ficomplexityid = rowSelected.ficomplexityid;
      updateAssigment.fiproductid = rowSelected.fiproductid;
      updateAssigment.fipriorityid = rowSelected.fipriorityid;

      this.assignmentService.updateBeAndCertEngineer(updateAssigment).subscribe(
        () => {
          this.modalMessageService.showModalMessage(
            new ModalData(MODAL_SUCCESS, ["Asignación actualizada correctamente"], "assignment")
          );
        },
        error => {
          console.error(error)
          if (error.errors)
            this.modalMessageService.showModalMessage(
              new ModalData(MODAL_ERROR, error.errors, "assignment")
            );
          else
            this.modalMessageService.showModalMessage(
              new ModalData(MODAL_ERROR, [error.status + "-" + error.message], "assignment")
            );
        }
      );
    }

  }

}
