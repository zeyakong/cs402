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
  // Observable user sources
  private userSource: Subject<User> = new Subject<User>();

  // Observable user streams
  user$ = this.userSource.asObservable();

  // Service message commands
  setUser(user: User) {
    this.userSource.next(user);
  }

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(rootURL + '/login', { email: email, password: password }, httpOptions);
  }

  logout() {
    return this.http.post(rootURL + '/logout', {});
  }
}
