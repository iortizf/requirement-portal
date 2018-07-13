export class Menu {
    text: string;
    link: string;
    icon: string;
    hide:boolean=true;

    constructor(text: string, link: string) {
        this.text = text;
        this.link = link;
    }
}