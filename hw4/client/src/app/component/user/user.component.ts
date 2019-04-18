import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { LoginService } from 'src/app/_sevice/login.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  userId: string = '';

  constructor(
    private activatedRouter: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.userId = params['uid'];
    });
  }

  logout() {
    this.loginService.logout().subscribe(_=>{
      this.router.navigate(['/login']);
    });
  }
}
