import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../../services/login.service';
 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError:boolean=false;
  hide:boolean=true;
 
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public router: Router
  ) {
    this.loginForm = fb.group({
      employId: [null, Validators.required],
      pwd: [null, Validators.required],
    });
  }
 
  get f(){return this.loginForm.controls;}
 
 
  @ViewChild('loginInput') loginInput: ElementRef<HTMLInputElement>
 
  ngOnInit() {
    this.loginService.logout();
  }
 
  ngAfterViewInit() {
    this.loginInput.nativeElement.focus();
  }
 
  register(){
    this.router.navigate(["register"]);
  }
 
  login(data) {
    console.log("Haciendo login");
    console.log("Usuario="+data.employId +" Contraseña="+data.pwd);
    this.loginService.login(data.employId.trim(), data.pwd.trim()).subscribe(
      res => {
        this.router.navigate(["tracing"]);
      },
      err => {
        console.log("Error en login");
        this.loginError = true;
      }
    );
  }
}
