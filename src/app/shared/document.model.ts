import { FileUploader } from "ng2-file-upload";

export class Document{
    fidocumentationid:number;
    fidocumenttypeid:number;
    firequestid:number;
    fcdescription:string;
    fcdocumentpath:string;
    fcdocumentname:string;
    fccomment:string;
    fiuserid:number;
    firoleid:number;
    fcname:string;
    fclastname1:string;
    comentarios:string[];
    fddate:string;
    onDropZone:boolean;
    uploader: FileUploader;
    fileName:string;
}