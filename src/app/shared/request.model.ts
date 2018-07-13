
import { FormGroup } from "@angular/forms";

export class NewRequest{
    fiuserid:number;
    ficomplexityid:number;
    fiproductid:number;
    fipriorityid:number;
    filevelmergetypeid:number;
    firequesttypeid:number;
    fcproyectname:string;
    fccompany:string;
    fccategory:string;
    fcproyectdefinition:string;
    fcstageofafectation:string;
    fcddepartmentsinvolved:string;
    fcproyectdescription:string;
    fcproductowner:string;
    fcsystemcharge:string;
    fcbusinessowner:string;
    fcbusisnessengineer:string;
}

export class Tab{
    name:string;
    form:FormGroup;
    index:number;
    constructor(name:string, index:number){
        this.name = name;
        this.index = index;
    }

}