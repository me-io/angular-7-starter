import { Post } from '../shared/models/post.model';
import { ErrFmt } from '../util/helpers/err.helper';
import { Observable } from 'rxjs/internal/Observable';
import { PostService } from './services/post.service';
import { TagService } from '../tag/services/tag.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.edit.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostEditComponent implements OnInit, OnDestroy {
  tags = [];
  sub: any;
  _id: string;
  post: Post = {};
  isEditing = true;
  isLoading = true;
  editPostForm: FormGroup;

  private options: Object = {
    heightMin: 400,
    placeholderText: 'Edit Content Here',
  };

  constructor(
    private postService: PostService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
  ) {
  }

  ngOnInit() {
    // assign the subscription to a variable so we can unsubscribe to prevent memory leaks
    this.sub = this.route.params.subscribe((params: Params) => {
      this._id = params['_id'];
      this.post['_id'] = params['_id'];
    });
    this.buildEditForm();
    this.getPostById();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private buildEditForm() {
    this.editPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [[]],
    });
  }

  getPostById() {
    if (!this._id) {
      this.isLoading = false;
      this.isEditing = false;
      return;
    }
    this.postService.getPostById(this._id).subscribe(
      data => {
        this.post = data[0];
        // this.editPostForm.setValue()patchValue(data[0]);
        this.editPostForm.setValue({
          'title': this.post.title,
          'content': this.post.content,
          'tags': data[0].tags.map(tag => {
            return {
              '_id': tag._id,
              'name': tag.name,
            };
          }),
        });
      },
      error => this.toast.setMessage(ErrFmt(error), 'danger'),
      () => this.isLoading = false,
    );
  }

  cancelEditing() {
    this.post = {};
    this.toast.setMessage('Edit post cancelled.', 'warning');
    // reload the post to reset the editing
    this.getPostById();
    this.router.navigate(['/post']);
  }

  cancelAdding() {
    this.post = {};
    this.toast.setMessage('Create post cancelled.', 'warning');
    this.router.navigate(['/post']);
  }

  editPost() {
    const postData = this.editPostForm.value;
    postData._id = this._id;
    this.postService.editPost(postData).subscribe(
      res => {
        this.post = postData;
        this.toast.setMessage('Post successfully updated.', 'success');
        this.router.navigate(['/post']);
      },
      error => console.log(error),
    );
  }

  addPost() {
    this.postService.addPost(this.editPostForm.value).subscribe(
      res => {
        const newPost = res;
        this.toast.setMessage('Post successfully created.', 'success');
        this.router.navigate(['/post']);
      },
      error => console.log(error),
    );
  }

  deletePost(post) {
    if (window.confirm('Are you sure you want to permanently delete this post?')) {
      this.postService.deletePost(post).subscribe(
        res => {
          this.toast.setMessage('Post successfully deleted.', 'success');
          this.router.navigate(['/post']);
        },
        error => console.log(error),
      );
    }
  }

  loadTags(term: string): Observable<any[]> {
    return this.tagService.getTags(term);
  }

}
