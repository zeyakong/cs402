import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { LoginService } from '../../_sevice/login.service'
import { User } from 'src/app/_model/User';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Input() email: string; password: string;
  msg: string = null;
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      res => {
        let user = res.body;
        this.loginService.setCSRFToken(res.headers.get('X-CSRF'));
        if (user) {
          this.loginService.setUser(user);
          if (user.role == 'admin') {
            this.router.navigate(['/admin']);
          } else if (user.role == 'user') {
            this.router.navigate(['/user']);
          } else {
            this.msg = 'incorrect email or password';
          }
        }
        this.msg = 'incorrect email or password';
      },
      err => {
        this.msg = 'incorrect email or password';
      });

  }
  hideMSG() {
    this.msg = null;
  }
}
