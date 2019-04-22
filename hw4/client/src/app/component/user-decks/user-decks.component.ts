import { Component, OnInit, Input } from '@angular/core';
import { Deck } from 'src/app/_model/Deck';
import { UserService } from 'src/app/_sevice/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_model/User';
import { LoginService } from 'src/app/_sevice/login.service';


@Component({
  selector: 'app-user-decks',
  templateUrl: './user-decks.component.html',
  styleUrls: ['./user-decks.component.css']
})
export class UserDecksComponent implements OnInit {
  decks: Deck[];
  user: User;

  @Input() deckName: string; description: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: LoginService
  ) {
    let user : User= this.loginService.getUser();
    if (user && user.role == 'user') {
      this.user = user;
    } else {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.getDecks(this.user._id).subscribe(
      decks => {
        this.decks = decks;
      }
    );
  }

  ngOnInit() {
  }

  createDeck() {
    if (!this.deckName || this.deckName === '') {
      alert('Empty name is not accepted');
      return;
    }
    for (let i = 0; i < this.decks.length; i++) {
      if (this.deckName == this.decks[i].name) {
        alert('you cannot create two decks which have same name: \'' + this.deckName + "\'");
        return;
      }
    }
    this.userService.createDeck(this.user._id, this.deckName, this.description).subscribe(deck => {
      this.refreshDecks();
    })
  }

  refreshDecks() {
    this.userService.getDecks(this.user._id).subscribe(
      decks => {
        this.decks = decks;
      }
    );
  }

  deleteDeck(deckId: string) {
    let r = confirm("Are you sure to delete this deck?");
    if (r == true) {
      this.userService.deleteDeck(this.user._id, deckId).subscribe(
        _ => {
          this.refreshDecks();
        }
      );
    } else {
    }
  }

  showDeck(dickId: string) {
    this.router.navigate(['/user/decks/' + dickId]);
  }
}
