import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { LoginService } from 'src/app/_sevice/login.service';
import { User } from 'src/app/_model/User';
import { Subscription } from 'rxjs';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  user: User = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    if (this.loginService.getUser()) {
      this.user = this.loginService.getUser();
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout().subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }

  getUser() {
    // this.globals.setUser(new User());
    // this.globals.user$.subscribe(user => {
    //   this.user = user;
    //   console.log(user);
    // });
    console.log(this.user);
  }
}
