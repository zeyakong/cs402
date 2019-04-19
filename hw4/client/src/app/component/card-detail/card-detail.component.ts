import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/_model/Card';
import { UserService } from 'src/app/_sevice/user.service';
import { User } from 'src/app/_model/User';
import { LoginService } from 'src/app/_sevice/login.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  @Input() cardId: string;
  cards: Card[];
  user: User;

  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.loginService.user$.subscribe(
      user => {
        this.user = user;
        this.userService.getCardById(user._id, this.cardId).subscribe(card => {
          this.cards = [card];
        });
      }
    );
  }
}
