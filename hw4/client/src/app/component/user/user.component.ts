import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from 'src/app/_sevice/user.service';
import { Card } from 'src/app/_model/Card';
import { LoginService } from 'src/app/_sevice/login.service';
import { User } from 'src/app/_model/User';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  view: boolean = true;
  cards: Card[] = null;
  @Input() name: string = ''; type: string = ''; set: string = ''; colors: string = '';
  userId: string = '';
  page: number = 1;
  selectedCard: Card = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.userId = params['uid'];
    });

    this.userService.getCards(this.userId, this.name, this.type, this.set, this.colors).subscribe(data => {
      this.cards = data;
    });
  }

  logout() {
    this.loginService.logout();
  }

  searchCards() {
    this.userService.getCards(this.userId, this.name, this.type, this.set, this.colors, this.page).subscribe(data => {
      this.cards = data;
    });
  }
}
