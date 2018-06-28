import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  requestForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.requestForm = fb.group({
      employId: [null, Validators.required],
      pwd: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

}
