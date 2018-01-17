import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Group } from '../../shared/models/group.model';

@Injectable()
export class GroupService {


  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('/api/groups');
  }

  countGroups(): Observable<number> {
    return this.http.get<number>('/api/groups/count');
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>('/api/group', group);
  }

  getGroup(group: Group): Observable<Group> {
    return this.http.get<Group>(`/api/group/${group._id}`);
  }

  editGroup(group: Group): Observable<string> {
    return this.http.put(`/api/group/${group._id}`, group, { responseType: 'text' });
  }

  deleteGroup(group: Group): Observable<string> {
    return this.http.delete(`/api/group/${group._id}`, { responseType: 'text' });
  }

}
