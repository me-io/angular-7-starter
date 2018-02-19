import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PostService } from './services/post.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ErrFmt } from '../util/helpers/err.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.list.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostListComponent implements OnInit {

  //
  post = {};
  postArr = [];
  isLoading = true;
  isEditing = false;

  addPostForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private postService: PostService,
              private router: Router,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getPosts();
    this.addPostForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      data => this.postArr = data,
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
          const pos = this.postArr.map(elem => elem._id).indexOf(post._id);
          this.postArr.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
