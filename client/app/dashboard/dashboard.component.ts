import {Component, OnInit} from '@angular/core';
import {ToastComponent} from "../shared/toast/toast.component";
import {Router} from "@angular/router";
import {PostService} from "../post/services/post.service";
import {ErrFmt} from "../util/helpers/err.helper";
import {TagService} from "../tag/services/tag.service";

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tagArr = [];
  postArr = [];
  isLoading = true;

  constructor(private postService: PostService,
              private tagService: TagService,
              private router: Router,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getPosts();
    this.getTags();
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      data => this.postArr = data,
      error => this.toast.setMessage(ErrFmt(error), 'danger'),
      () => this.isLoading = false,
    );
  }

  getTags() {
    this.tagService.getTags().subscribe(
      data => this.tagArr = data,
      error => this.toast.setMessage(ErrFmt(error), 'danger'),
      () => this.isLoading = false,
    );
  }

  timeAgo(created_at: string) {
    return moment(parseInt(created_at, 10)).fromNow();
  }
}
