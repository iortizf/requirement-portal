import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html'
})
export class PublishComponent implements OnInit {


  constructor(public router: Router){
    this.router.navigate(["/publish"]);
  }


  ngOnInit() {

  }
  
}
