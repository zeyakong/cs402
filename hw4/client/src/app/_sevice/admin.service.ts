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
export class AdminService {

  user: User;

  constructor(
    private http: HttpClient,
  ) { }

  createUser(adminId: string, user: User): Observable<User> {
    return this.http.post<User>(rootURL + '/admin/' + adminId + '/users', user);
  }

  getUsers(adminId: string, term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(rootURL + '/admin/' + adminId + '/users' + '/?keywords=' + term);
  }
}
