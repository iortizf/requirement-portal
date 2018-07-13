export const backEndUrl = 'http://10.51.145.32:8080/request/';
export const MODAL_SUCCESS = "success";
export const MODAL_ERROR = "error";
export class ModalData{
    type:string;
    messages: string[];
    navigateTo:string;
    constructor(type:string, messages:string[], navigateTo:string='/'){
        this.type = type;
        this.messages = messages;
        this.navigateTo = navigateTo;
    }
}
export class CustomError extends Error{
    errors:string[];
    constructor(message:string, errors:string[]){
        super(message)
        this.errors = errors;        
    }
}

