import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
  @Input() selectedCardId: string;
  card: Card = null;
  user: User = null;
  visible: boolean = true;

  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) {

    this.user = this.loginService.getUser();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.visible = false;
    this.refreshCard();
  }

  refreshCard() {
    // console.log(this.user);
    this.userService.getCardById(this.user._id, this.selectedCardId).subscribe(card => {
      this.card = card;
      this.visible = true;
    });
  }
}
