import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_model/User';
import { Router } from '@angular/router';

const rootURL = 'http://localhost:3000/api/v1';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(rootURL + '/login', { email: email, password: password }, httpOptions);
  }

  logout() {
    localStorage.clear();
    return this.http.post(rootURL + '/logout', {});
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
