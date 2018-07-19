import { Component, OnInit, ViewChild } from '@angular/core';
import { PublishDocumentService } from '../../../services/publish-document.service';
import { Publish } from '../../../shared/publish.model';
import { User } from '../../../shared/user.model';
import { ProductService } from '../../../services/product.service';
import { DocumentService } from '../../../services/document.service';
import { Document } from '../../../shared/document.model';
import { CommentDocService } from '../../../services/comment-doc.service';
import { CommentDocument } from '../../../shared/comment.model';
import { ModalMessageService } from '../../../services/modal-message.service';
import { ModalData, MODAL_SUCCESS, MODAL_ERROR } from '../../../shared/constants';

@Component({
  selector: 'app-publish-document',
  templateUrl: './publish-document.component.html',
  styleUrls: ['./publish-document.component.scss']
})
export class PublishDocumentComponent implements OnInit {

  fileName: string;
  documents: any[];
  currentUser: User;

  proyectInfo: boolean = true;
  publish: Publish;
  productStrn: String;

  constructor(private publishDocService: PublishDocumentService,
    private productService: ProductService,
    private documentService: DocumentService,
    private commentService: CommentDocService,
    private modalMessageService: ModalMessageService) {

    this.publish = this.publishDocService.getPublish();

  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    this.documentService.getDocuments(this.publish.firequestid).subscribe(
      documents => {
        this.documents = documents.reduce(function (result, value, index, array) {
          if (index % 3 === 0)
            result.push(array.slice(index, index + 3));
          return result;
        }, []);
        console.log("Documents", this.documents);
      }
    );
    this.productService.getProducts().subscribe(resp => {
      this.productStrn = resp.find(prod => prod.fiproductid === this.publish.fiproductid).fcproductdesc;
    });
  }

  fileSelected(e: any, document: Document) {
    document.uploader.clearQueue();
    document.uploader.addToQueue(e);
    document.fileName = document.uploader.queue[0].file.name;
  }

  uploadFile(document: Document) {
    console.log("Subiendo");
    let jsonToSend = {
      firequestid: this.publish.firequestid,
      fidocumenttypeid: document.fidocumenttypeid,
      ficomplexityid: this.publish.ficomplexityid,
      fiproductid: this.publish.fiproductid,
      fipriorityid: this.publish.fipriorityid,
      fcemail: "@",
      fcdescription: "descripción",
      fcdocumentvirtualpath: "descripción",
      fcdocumentname: document.fcdocumentname
    };
    document.uploader.setOptions({ additionalParameter: { json: JSON.stringify(jsonToSend) } });
    document.uploader.queue[0].upload();
    document.uploader.queue[0].onComplete = (response, status, headers) => {
      console.log("Response rodo", response, status);
      if (status == 200) {
        let resp = JSON.parse(response);
        document.fcdocumentpath = resp.body[0].fileDownloadUri
        this.modalMessageService.showModalMessage(
          new ModalData(MODAL_SUCCESS, ["El archivo " + document.fcdocumentname + " se guardó correctamente"], "publish/document")
        );
      } else {
        this.modalMessageService.showModalMessage(
          new ModalData(MODAL_ERROR, ["Error al guardar el archivo " + document.fileName], "publish/document")
        );
      }
    };
  }

  addComment(comment: string, document: Document) {

    let commentDoc = new CommentDocument();
    commentDoc.fiRequestId = this.publish.firequestid;
    commentDoc.fcComment = comment;
    commentDoc.fiDocumentTypeId = document.fidocumenttypeid;
    commentDoc.fiUserId = this.currentUser.fiuserid;

    let newcomment = new Date() + "|" + this.currentUser.fcname + " " + this.currentUser.fclastname1 + "|" + comment;
    if(!document.comentarios){
      document.comentarios = new Array<string>();
    }
    
    document.comentarios.push(newcomment);
    this.commentService.addCommentToDoc(commentDoc).subscribe(resp => {
      console.log("Se guardo correctamente el comentario");
    }, error => {
      if (error.errors)
        this.modalMessageService.showModalMessage(
          new ModalData(MODAL_ERROR, error.errors, "publish/document")
        );
      else
        this.modalMessageService.showModalMessage(
          new ModalData(MODAL_ERROR, [error.status + "-" + error.message], "publish/document")
        );
    });

  }

}
