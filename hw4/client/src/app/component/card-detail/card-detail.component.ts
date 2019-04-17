import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/_model/Card';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  @Input() selectedCard: Card;
  constructor() { }

  ngOnInit() {
  }

}
