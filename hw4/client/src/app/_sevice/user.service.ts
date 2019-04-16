import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const rootURL = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getCardById(id: string) {
    return this.http.get<any>(rootURL + '/cards/' + id)
  }

  getAllCards(page: string, color: string) {
    this.http.get<any>(rootURL + '/cards?page=' + page + '&color=' + color);
  }
}
