import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { User } from 'src/app/_model/User';
import { UserService } from 'src/app/_sevice/user.service';
import { LoginService } from 'src/app/_sevice/login.service';
import { Router } from '@angular/router';
import { Deck } from 'src/app/_model/Deck';
import { Card } from 'src/app/_model/Card';
import { CardSummary } from 'src/app/_model/CardSummary';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  @Input() selectedCard: Card; selectedDeckId; quantity: number;
  user: User;
  decks: Deck[];
  validAdd: boolean = false;
  validError: string = '* choose a deck to add';

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {
    let user: User = this.loginService.getUser();
    if (user && user.role == 'user') {
      this.user = user;
    } else {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.getDecks(this.user._id).subscribe(decks => this.decks = decks);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.validAdd = false;
    // this.validError = '* choose a deck to add';
    this.userService.getDecks(this.user._id).subscribe(decks => {
      this.decks = decks;
      this.updateStatus();
    }
    );

  }

  addCardToDeck() {
    if (!this.quantity || this.quantity <= 0) {
      alert('please give a positive quantity number!');
      return;
    }

    let cardSummary = new CardSummary();
    cardSummary.name = this.selectedCard.name;
    cardSummary.id = this.selectedCard.id;
    cardSummary.multiverseid = this.selectedCard.multiverseid;
    cardSummary.qty = this.quantity;

    //find deck
    let currentDeck = null;
    for (let i = 0; i < this.decks.length; i++) {
      if (this.decks[i].id === this.selectedDeckId) {
        currentDeck = this.decks[i];
      }
    }

    //push data into this deck and update.
    currentDeck.cards.push(cardSummary);
    this.userService.updateDeck(this.user._id, this.selectedDeckId, currentDeck).subscribe(
      deck => {
        this.userService.getDecks(this.user._id).subscribe(decks => this.decks = decks);
        this.updateStatus();
        alert('Add to the deck successfully!');
      }
    );
  }

  updateStatus() {
    // this.selectedDeckId;
    // this.selectedCard;
    if (!this.selectedDeckId || !this.selectedCard) {
      return;
    }
    let selectedDeckCards: CardSummary[] = null;
    for (let i = 0; i < this.decks.length; i++) {
      if (this.decks[i].id == this.selectedDeckId) {
        selectedDeckCards = this.decks[i].cards;
      }
    }

    // find the card in this deck and check the validation
    for (let i = 0; i < selectedDeckCards.length; i++) {
      if (selectedDeckCards[i].id == this.selectedCard.id) {
        this.validAdd = false;
        this.validError = '* the card is already in this deck'
        return;
      }
    }
    this.validAdd = true;
    this.validError = null;
  }
}
