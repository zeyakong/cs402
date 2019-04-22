import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Deck } from 'src/app/_model/Deck';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_sevice/user.service';
import { User } from 'src/app/_model/User';
import { LoginService } from 'src/app/_sevice/login.service';
import { CardSummary } from 'src/app/_model/CardSummary';
import { Card } from 'src/app/_model/Card';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})
export class DeckDetailComponent implements OnInit {
  @Input() deckName: string; deckDescription: string;
  deck: Deck = null;
  deckId: string = null;
  user: User;
  changed: boolean = false;
  nameError: string = null;
  cardSummary: CardSummary[] = null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {
    if (this.loginService.getUser()) {
      this.user = this.loginService.getUser();
    } else {
      this.router.navigate(['/login']);
      return;
    }
    this.activatedRouter.params.subscribe(params => {
      this.deckId = params['did'];
      this.getDeck();
    });
  }

  ngOnInit() {
  }

  changeDeck(): void {
    this.nameError = null;
    if (this.deckName === '') {
      this.changed = false;
      this.nameError = '* empty name is not accepted';
      return;
    }
    if (this.deck.name !== this.deckName || this.deck.description !== this.deckDescription) {
      this.changed = true;
      this.userService.getDecks(this.user._id).subscribe(
        decks => {
          for (let i = 0; i < decks.length; i++) {
            if (decks[i].id != this.deckId && decks[i].name === this.deckName) {
              this.nameError = '* the name you created already exists';
              this.changed = false;
              return;
            }
            this.nameError = null;
          }
        });
    } else {
      this.changed = false;
    }
  }

  getDeck() {
    this.userService.getADeck(this.user._id, this.deckId).subscribe(deck => {
      this.deck = deck;
      this.deckName = deck.name;
      this.deckDescription = deck.description;
      this.cardSummary = deck.cards;
    });
  }

  deleteCard(card: CardSummary) {
    let r = confirm("Are you sure to delete this card from that deck?");
    if (r == true) {
      //remove this element.
      let index = this.cardSummary.indexOf(card);

      this.cardSummary.splice(index, 1);
      this.userService.updateDeck(this.user._id, this.deck.id, this.deck).subscribe(
        deck => {
          this.getDeck();
          this.changed = false;
        }
      );
    }

  }

  changeQty(card: CardSummary) {
    let newQtyPro = prompt("Please enter your new quantity", '');
    let newQty = parseInt(newQtyPro);

    if (!newQty || newQty <= 0) {
    } else {
      card.qty = newQty;
      //save this change
      this.userService.updateDeck(this.user._id, this.deck.id, this.deck).subscribe(
        deck => {
          this.getDeck();
          this.changed = false;
        }
      );
    }
  }

  updateDeck() {
    //get current deck
    this.deck.name = this.deckName;
    this.deck.description = this.deckDescription;
    this.userService.updateDeck(this.user._id, this.deck.id, this.deck).subscribe(
      deck => {
        this.getDeck();
        this.changed = false;
      }
    );
  }
}
