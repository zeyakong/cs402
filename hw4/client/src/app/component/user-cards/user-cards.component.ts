import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/_model/Card';
import { UserService } from 'src/app/_sevice/user.service';
import { User } from 'src/app/_model/User';
import { LoginService } from 'src/app/_sevice/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  cards: Card[] = null;
  @Input() name: string = ''; type: string = ''; set: string = ''; colors: string = '';
  page: number = 1;
  selectedCardId: string = null;
  user: User = null;
  visible: boolean = false;
  toAdd: boolean = false;
  selectedCard: Card = null;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    let user: User = this.loginService.getUser();
    if (user && user.role == 'user') {
      this.user = user;
    } else {
      this.router.navigate(['/login']);
      return;
    }

    if (this.user) {
      this.userService.getCards(this.user._id, this.name, this.type, this.set, this.colors).subscribe(data => {
        this.cards = data;
        this.visible = true;
      });
    }
  }

  searchCards(page: number) {
    if (page) this.page = page;
    this.visible = false;
    this.userService.getCards(this.user._id, this.name, this.type, this.set, this.colors, this.page).subscribe(data => {
      this.cards = data;
      this.visible = true;
    });
  }
}
