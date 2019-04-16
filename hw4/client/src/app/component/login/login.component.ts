import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from '../../_sevice/login.service'
import { Globals } from '../../_sevice/globals';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() email: string; password: string;
  msg : string = null;
  constructor(
    private globals: Globals,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        if (data) {
          console.log(data);
          if (data.role == 'admin') {
            this.globals.isBackground = false;
            this.router.navigate(['/admin/'+'123']);
          } else if (data.role == 'user') {
            this.globals.isBackground = false;
            this.router.navigate(['/user/']);
          } else {
            this.globals.isBackground = true;
            this.router.navigate(['/login']);
          }
        }
      },
      error => {
        console.log(error);
        this.msg = 'invalid inputs';
      });
  }
  hideMSG(){
    this.msg=null;
  }
}
