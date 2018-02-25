import {Component, OnDestroy, OnInit} from '@angular/core';
import {TagService} from "./services/tag.service";
import {ErrFmt} from "../util/helpers/err.helper";
import {ActivatedRoute, Params} from "@angular/router";
import {ToastComponent} from "../shared/toast/toast.component";
import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-tag-post-list',
  templateUrl: './tag.post.list.component.html',
  styleUrls: ['./tag.post.list.component.scss']
})
export class TagPostListComponent implements OnInit, OnDestroy {

  sub: any;
  posts = [];
  _id: string;
  isLoading = true;

  constructor(private tagService: TagService,
              private route: ActivatedRoute,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this._id = params['_id'];
    });
    this.getTagPosts();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getTagPosts(page: number = null) {
    this.tagService.getTagPosts(this._id, page).subscribe(
      data => this.posts = data,
      error => this.toast.setMessage(ErrFmt(error), 'danger'),
      () => this.isLoading = false,
    );
  }

  setPage(page: number) {
    // get pager object from service
    this.getTagPosts(page);
  }

  getRange(lastPage: number) {
    return _.range(1, lastPage + 1);
  }

  timeAgo(created_at: string) {
    return moment(parseInt(created_at, 10)).fromNow();
  }
}
