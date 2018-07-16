
import { FormGroup } from "@angular/forms";

export class NewRequest {
    fiuserid: number;
    ficomplexityid: number;
    fiproductid: number;
    fipriorityid: number;
    filevelmergetypeid: number;
    firequesttypeid: number;
    fcproyectname: string;
    fccompany: string;
    fccategory: string;
    fcproyectdefinition: string;
    fcstageofafectation: string;
    fcddepartmentsinvolved: string;
    fcproyectdescription: string;
    fcproductowner: string;
    fcsystemcharge: string;
    fcbusinessowner: string;
    fcbusisnessengineer: string;
}

export class Request {
    certificador: number;
    certificadorusuario: number;
    fcbusinessowner: string;
    fcbusisnessengineer: string;
    fccategory: string;
    fccertificatedengineer: string;
    fccompany: string;
    fcddepartmentsinvolved: string;
    fcproductowner: string;
    fcproyectdefinition: string;
    fcproyectdescription: string;
    fcproyectname: string;
    fcstageofafectation: string;
    fcsystemcharge: string;
    fddate: string;
    fdfinaldate: string;
    fiadvancehour: number;
    ficomplexityid: number;
    filevelmergetypeid: number;
    fipriorityid: number;
    fiproductid: number;
    firequestid: number;
    firequesttypeid: number;
    negocio: number;
    negociousuario: number;
}

export class Tab {
    name: string;
    form: FormGroup;
    index: number;
    constructor(name: string, index: number) {
        this.name = name;
        this.index = index;
    }

}