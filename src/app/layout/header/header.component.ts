import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    console.log(this.user);
  }

}
