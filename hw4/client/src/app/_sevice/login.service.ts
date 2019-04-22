import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_model/User';
import { Router } from '@angular/router';

const rootURL = 'http://138.49.184.168:3000/api/v1';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    return this.http.post<User>(rootURL + '/login', { email: email, password: password }, {observe: 'response'});
  }

  logout() {
    localStorage.clear();
    return this.http.post(rootURL + '/logout', {});
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setCSRFToken(csrf: string) {
    localStorage.setItem('csrf-token', csrf);
  }

  getCSRFToken() {
    return localStorage.getItem('csrf-token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
