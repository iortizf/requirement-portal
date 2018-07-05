
import { FormGroup } from "@angular/forms";



export class Applicant{
    numEmploy:string;
    name:string;
    apellidos:string;
    submited:boolean
}

export class RequestInfo{
    proyect:string;
    product:number;
    company:string;
    category:string;
    decription:string;
    submited:boolean
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