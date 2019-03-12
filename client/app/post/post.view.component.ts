import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { PostService } from './services/post.service';
import { ErrFmt } from '../util/helpers/err.helper';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post.view.component.html',
  styleUrls: ['./post.view.component.scss'],
})
export class PostViewComponent implements OnInit, OnDestroy {

  post = {};
  isLoading = true;
  _id: string;
  sub: any;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private router: Router,
              public toast: ToastComponent,
              public auth: AuthService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this._id = params['_id'];
      this.post['_id'] = params['_id'];
    });
    this.getPostById();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getPostById() {
    if (!this._id) {
      this.isLoading = false;
      return;
    }
    this.postService.getPostById(this._id).subscribe(
      data => {
        this.post = data[0];
      },
      error => this.toast.setMessage(ErrFmt(error), 'danger'),
      () => this.isLoading = false,
    );
  }

  deletePost(post) {
    if (window.confirm('Are you sure you want to permanently delete this post?')) {
      this.postService.deletePost(post).subscribe(
        res => {
          this.toast.setMessage('Post successfully deleted.', 'success');
          this.router.navigate(['']);
        },
        error => console.log(error),
      );
    }
  }
}
