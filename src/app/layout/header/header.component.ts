import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { Menu } from '../../shared/menu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menus: Menu[] = [
    new Menu("Seguimiento", "tracing"),
    new Menu("Solicitud", "request"),//
    new Menu("Publicación", "publish"),//
    new Menu("Asignación", "assignment"),
    new Menu("Estatus", "estatus"),
    new Menu("Bitácora", "activity")//
  ];

  constructor() { }

  user: User;


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    this.menus.forEach(menu => {
      if ((this.user.firoleid == 2 || this.user.firoleid == 3)
        && (menu.link == 'tracing' || menu.link == 'assignment' || menu.link == 'estatus')){
          menu.hide = false;
      }
    });

  }

}
