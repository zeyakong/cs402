import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../_model/Card'
import { Observable, Subject } from 'rxjs';
import { Deck } from '../_model/Deck';
import { User } from '../_model/User';

const rootURL = 'http://localhost:3000/api/v1';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {

  cards: Card[];
  constructor(
    private http: HttpClient,
  ) { }


  getCardById(userId: string, id: string): Observable<Card> {
    return this.http.get<Card>(rootURL + '/users/' + userId + '/cards/' + id);
  }

  getCards(userId: string, name: string, type: string, set: string, color: string, page: number = 1): Observable<Card[]> {
    return this.http.get<Card[]>(rootURL + '/users/' + userId + '/cards?name=' + name + '&type=' + type + '&colors=' + color + '&set=' + set + '&page=' + page, httpOptions);
  }

  getDecks(userId: string): Observable<Deck[]> {
    return this.http.get<Deck[]>(rootURL + '/users/' + userId + '/decks');
  }

  createDeck(userId: string, deckName: string, description: string): Observable<Deck> {
    let deck = new Deck();
    deck.name = deckName;
    deck.description = description;
    return this.http.post<Deck>(rootURL + '/users/' + userId + '/decks', deck, httpOptions);
  }
}
