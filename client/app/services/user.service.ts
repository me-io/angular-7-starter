import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/account/user/register', user);
  }

  login(credentials): Observable<any> {
    return this.http.post<any>('/api/account/user/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/account/users');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('/api/account/users/count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/api/account/user', user);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`/api/account/user/${user._id}`);
  }

  editUser(user: User): Observable<string> {
    return this.http.put(`/api/account/user/${user._id}`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<string> {
    return this.http.delete(`/api/account/user/${user._id}`, { responseType: 'text' });
  }
}
