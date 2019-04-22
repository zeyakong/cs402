import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { User } from '../_model/User';
import { LoginService } from './login.service';


const rootURL = 'http://138.49.184.168:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  user: User;
  httpOptions: object;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    
  }

  createUser(adminId: string, user: User): Observable<User> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'X-CSRF': this.loginService.getCSRFToken() })
    };
    return this.http.post<User>(rootURL + '/admin/' + adminId + '/users', user, this.httpOptions);
  }

  getUsers(adminId: string, term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    this.httpOptions = {
      headers: new HttpHeaders({ 'X-CSRF': this.loginService.getCSRFToken() })
    };
    return this.http.get<User[]>(rootURL + '/admin/' + adminId + '/users' + '/?keywords=' + term, this.httpOptions);
  }

  updateUser(adminId: string, userId: string, enabled: boolean): Observable<User> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'X-CSRF': this.loginService.getCSRFToken() })
    };
    return this.http.put<User>(rootURL + '/admin/' + adminId + '/users/' + userId, { enabled: enabled }, this.httpOptions);
  }
}
