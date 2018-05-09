import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../shared/models/post.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PostService {


  constructor(private http: HttpClient) {
  }

  getPosts(page: number = null): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts?page=${page == null ? 1 : page}`);
  }

  getPostById(_id: String): Observable<Post> {
    return this.http.get<Post>(`/api/post/${_id}`);
  }

  countPosts(): Observable<number> {
    return this.http.get<number>('/api/posts/count');
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>('/api/post', post);
  }

  getPost(post: Post): Observable<Post> {
    return this.http.get<Post>(`/api/post/${post._id}`);
  }

  editPost(post: Post): Observable<string> {
    return this.http.put(`/api/post/${post._id}`, post, {responseType: 'text'});
  }

  deletePost(post: Post): Observable<string> {
    return this.http.delete(`/api/post/${post._id}`, {responseType: 'text'});
  }

}
