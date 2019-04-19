import { Component, OnInit, Input } from '@angular/core';
import { Deck } from 'src/app/_model/Deck';
import { UserService } from 'src/app/_sevice/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-decks',
  templateUrl: './user-decks.component.html',
  styleUrls: ['./user-decks.component.css']
})
export class UserDecksComponent implements OnInit {
  decks: Deck[];

  @Input() deckName: string; description: string; userId: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  createDeck() {
    this.userService.createDeck(this.userId, this.deckName, this.description).subscribe(data => {
      this.router.navigate(['/users/' + this.userId + '/decks']);
    })
  }

}
