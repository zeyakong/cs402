import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/_model/Card';
import { UserService } from 'src/app/_sevice/user.service';
import { LoginService } from 'src/app/_sevice/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  cards: Card[] = null;
  @Input() name: string = ''; type: string = ''; set: string = ''; colors: string = ''; userId: string;
  page: number = 1;
  cardId: string = null;
  cardt: Card = null;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
  ) {
    this.subscription = this.loginService.user$.subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.userService.getCards(this.userId, this.name, this.type, this.set, this.colors).subscribe(data => {
      this.cards = data;
    });
  }

  searchCards() {
    this.userService.getCards(this.userId, this.name, this.type, this.set, this.colors, this.page).subscribe(data => {
      this.cards = data;
    });
  }

  chooseCard() {
    this.userService.getCardById(this.userId, this.cardId).subscribe(data => {
      this.cardt = data;
    });
  }
}
