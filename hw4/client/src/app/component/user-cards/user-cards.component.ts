import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/_model/Card';
import { UserService } from 'src/app/_sevice/user.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  cards: Card[] = null;
  @Input() name: string = ''; type: string = ''; set: string = ''; colors: string = ''; userId: string;
  page: number = 1;
  selectedCard: Card = null;
  constructor(
    private userService: UserService,
  ) { }

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

}
