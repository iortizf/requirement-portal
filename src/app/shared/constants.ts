import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

export const backEndUrl = environment.api_url;

export const contentTypeJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const MODAL_SUCCESS = "success";
export const MODAL_ERROR = "error";
export class ModalData {
    type: string;
    messages: string[];
    navigateTo: string;
    constructor(type: string, messages: string[], navigateTo: string = '/') {
        this.type = type;
        this.messages = messages;
        this.navigateTo = navigateTo;
    }
}
export class CustomError extends Error {
    errors: string[];
    constructor(message: string, errors: string[]) {
        super(message)
        this.errors = errors;
    }
}

