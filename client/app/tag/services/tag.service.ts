import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Tag} from '../../shared/models/tag.model';

@Injectable()
export class TagService {


  constructor(private http: HttpClient) {
  }

  getTags(term: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`/api/tags?q=${term}`);
  }

  getTagById(_id: String): Observable<Tag> {
    return this.http.get<Tag>(`/api/tag/${_id}`);
  }

  countTags(): Observable<number> {
    return this.http.get<number>('/api/tags/count');
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>('/api/tag', tag);
  }

  getTag(tag: Tag): Observable<Tag> {
    return this.http.get<Tag>(`/api/tag/${tag._id}`);
  }

  editTag(tag: Tag): Observable<string> {
    return this.http.put(`/api/tag/${tag._id}`, tag, {responseType: 'text'});
  }

  deleteTag(tag: Tag): Observable<string> {
    return this.http.delete(`/api/tag/${tag._id}`, {responseType: 'text'});
  }

}
