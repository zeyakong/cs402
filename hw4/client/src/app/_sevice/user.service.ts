import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../_model/Card'
import { Observable, Subject } from 'rxjs';
import { Deck } from '../_model/Deck';
import { User } from '../_model/User';
import { LoginService } from './login.service';

const rootURL = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  httpOptions :object;
  cards: Card[];
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'X-CSRF': this.loginService.getCSRFToken() })
    };
  }

  getCardById(userId: string, id: string): Observable<Card> {
    return this.http.get<Card>(rootURL + '/users/' + userId + '/cards/' + id, this.httpOptions);
  }

  getCards(userId: string, name: string, type: string, set: string, color: string, page: number = 1) {
    return this.http.get<Card[]>(rootURL + '/users/' + userId + '/cards?name=' + name + '&type=' + type + '&colors=' + color + '&set=' + set + '&page=' + page, {
      headers: new HttpHeaders({ 'X-CSRF': this.loginService.getCSRFToken() }),
      observe: 'response',
    });
  }

  getDecks(userId: string): Observable<Deck[]> {
    return this.http.get<Deck[]>(rootURL + '/users/' + userId + '/decks', this.httpOptions);
  }

  createDeck(userId: string, deckName: string, description: string): Observable<Deck> {
    let deck = new Deck();
    deck.name = deckName;
    deck.description = description;
    return this.http.post<Deck>(rootURL + '/users/' + userId + '/decks', deck, this.httpOptions);
  }

  deleteDeck(userId: string, deckId: string) {
    return this.http.delete(rootURL + '/users/' + userId + '/decks/' + deckId, this.httpOptions);
  }

  getADeck(userId: string, deckId: string): Observable<Deck> {
    return this.http.get<Deck>(rootURL + '/users/' + userId + '/decks/' + deckId, this.httpOptions);
  }

  updateDeck(userId: string, deckId: string, deck: Deck): Observable<Deck> {
    return this.http.put<Deck>(rootURL + '/users/' + userId + '/decks/' + deckId, { 'deck': deck }, this.httpOptions);
  }
}
