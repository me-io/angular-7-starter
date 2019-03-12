import { Component, OnInit } from '@angular/core';

import { PostService } from './services/post.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ErrFmt } from '../util/helpers/err.helper';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-post',
  templateUrl: './post.list.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostListComponent implements OnInit {

  post = {};
  posts = [];
  isLoading = true;

  constructor(private postService: PostService,
              private router: Router,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(page: number = null) {
    this.postService.getPosts(page).subscribe(
      data => this.posts = data,
      error => this.toast.setMessage(ErrFmt(error), 'danger'),
      () => this.isLoading = false,
    );
  }

  addPost() {
    this.router.navigate(['/post/new/']);
  }

  editPost(id) {
    this.router.navigate(['/post/edit/' + id]);
  }

  deletePost(post) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.postService.deletePost(post).subscribe(
        res => {
          const pos = this.posts['data'].map(elem => elem._id).indexOf(post._id);
          this.posts['data'].splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.getPosts(page);
  }

  getRange(lastPage: number) {
    return _.range(1, lastPage + 1);
  }
}
