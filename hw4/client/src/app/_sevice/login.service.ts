import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_model/User';

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
    return this.http.post<User>(rootURL+'/login', { email: email,  password: password });
  }

  logout(){
    return this.http.post<any>(rootURL+'/logout',{});
  }
}
