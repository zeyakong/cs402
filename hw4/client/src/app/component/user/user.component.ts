import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { LoginService } from 'src/app/_sevice/login.service';
import { User } from 'src/app/_model/User';
import { Subscription } from 'rxjs';







@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  user: User = null;
  subscription: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.subscription = this.loginService.user$.subscribe(
      user => {
        this.user = user;
      }
    );
  }

  ngOnInit() {

  }

  logout() {
    this.loginService.logout().subscribe(_ => {
      this.router.navigate(['/login']);
    });
  }
}
