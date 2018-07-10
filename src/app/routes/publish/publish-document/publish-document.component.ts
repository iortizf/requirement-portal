import { Component, OnInit } from '@angular/core';
import { PublishDocumentService } from '../../../services/publish-document.service';
import { Publish } from '../../../shared/publish.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentService } from '../../../services/assignment.service';
import { User } from '../../../shared/user.model';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/catalog.model';

@Component({
  selector: 'app-publish-document',
  templateUrl: './publish-document.component.html'
})
export class PublishDocumentComponent implements OnInit {

  proyectInfo: boolean = true;
  publish: Publish;
  publishDocForm: FormGroup;
  ingineers: User[];
  productStrn: String;

  constructor(private publishDocService: PublishDocumentService,
    private fb: FormBuilder,private productService:ProductService,
    private assignmentService: AssignmentService) {
    this.publish = this.publishDocService.getPublish();
    this.publishDocForm = fb.group({
      engineer: [null, Validators.required]
    });

    this.assignmentService.getUserByRole(2).subscribe(
      resp => {
        this.ingineers = resp;
      }, error => {

      }
    );
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(resp => {
      this.productStrn = resp.find(prod=> prod.fiproductid === this.publish.fiproductid).fcproductdesc;
    });
  }

  next() {
    this.proyectInfo = false;
  }

}
