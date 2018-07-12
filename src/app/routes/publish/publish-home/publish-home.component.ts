import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PublishService } from '../../../services/publish.service';
import { Publish } from '../../../shared/publish.model'
import { PublishDocumentService } from '../../../services/publish-document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalMessageService } from '../../../services/modal-message.service';
import { ModalData, MODAL_ERROR } from '../../../shared/constants';

@Component({
  selector: 'app-publish-home',
  templateUrl: './publish-home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PublishHomeComponent implements OnInit {

  publishers: Publish [];

  temp: Publish[];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private route: ActivatedRoute,
    public router: Router,private publishService:PublishService, 
    private publishDocService:PublishDocumentService,
    private modalMessageService:ModalMessageService) {
    this.temp = this.publishers;
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.publishService.obtenerDatos(8, user.fiuserid).subscribe(
      resp =>{
        console.log("Publish Data", resp);        
        this.publishers = resp;
      },
      error=>{
        console.error(error)
        if(error.errors)
          this.modalMessageService.showModalMessage(
            new ModalData(MODAL_ERROR,error.errors)
          );
        else
          this.modalMessageService.showModalMessage(
            new ModalData(MODAL_ERROR,[error.status+"-"+error.message],"publish")
          );
      }
    );
  }

  showDocumentForm(publishSelected:Publish){
    this.publishDocService.publishSelected = publishSelected;
    console.log("publishSelected",publishSelected);
    this.router.navigate(["/publish/document"], { relativeTo: this.route });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
        return d.fcproyectname.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.publishers = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}


}
