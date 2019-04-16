import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/core/src/render3';

const rootURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient
  ) { }

  getCardById(id: string) {
    return this.http.get<any>(rootURL + '/cards/' + id)
  }

  getAllCards(page: string, color:string){
    this.http.get<any>(rootURL+'/cards?page='+page+'&color='+color);
  }
}
