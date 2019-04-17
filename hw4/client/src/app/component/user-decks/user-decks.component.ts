import { Component, OnInit, Input } from '@angular/core';
import { Deck } from 'src/app/_model/Deck';
import { UserService } from 'src/app/_sevice/user.service';


@Component({
  selector: 'app-user-decks',
  templateUrl: './user-decks.component.html',
  styleUrls: ['./user-decks.component.css']
})
export class UserDecksComponent implements OnInit {
  decks: Deck[];
  @Input() userId: string; deckName: string; description: string;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getDecks(this.userId).subscribe(data => {
      this.decks = data;
    });
  }


  createDeck() {
    this.userService.createDeck(this.userId, this.deckName, this.description).subscribe(data => {
      console.log(data);
    })
  }

}
