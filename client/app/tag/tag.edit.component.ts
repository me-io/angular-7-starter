import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TagService } from './services/tag.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ErrFmt } from '../util/helpers/err.helper';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.edit.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagEditComponent implements OnInit, OnDestroy {

  //
  tag = {};
  isEditing = true;
  isLoading = true;
  _id: string;
  sub: any;

  editTagForm: FormGroup;

  constructor(private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    // assign the subscription to a variable so we can unsubscribe to prevent memory leaks
    this.sub = this.route.params.subscribe((params: Params) => {
      this._id = params['_id'];
      this.tag['_id'] = params['_id'];
    });
    this.buildEditForm();
    this.getTagById();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private buildEditForm() {

    // define the form
    this.editTagForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      color: ['#000', Validators.required],
    });
  }

  getTagById() {
    if (!this._id) {
      this.isLoading = false;
      this.isEditing = false;
      return;
    }
    this.tagService.getTagById(this._id).subscribe(
      data => {
        this.tag = data;
        this.editTagForm.patchValue(data);
      },
      error => this.toast.setMessage(ErrFmt(error), 'danger'),
      () => this.isLoading = false,
    );
  }

  cancelEditing() {
    this.tag = {};
    this.toast.setMessage('Edit tag cancelled.', 'warning');
    // reload the tag to reset the editing
    this.getTagById();
    this.router.navigate(['/tag']);
  }

  cancelAdding() {
    this.tag = {};
    this.toast.setMessage('Create tag cancelled.', 'warning');
    this.router.navigate(['/tag']);
  }

  editTag() {
    const tagData = this.editTagForm.value;
    tagData._id = this._id;
    this.tagService.editTag(tagData).subscribe(
      res => {
        this.tag = tagData;
        this.toast.setMessage('Tag successfully updated.', 'success');
        this.router.navigate(['/tag']);
      },
      error => console.log(error),
    );
  }

  addTag() {
    this.tagService.addTag(this.editTagForm.value).subscribe(
      res => {
        const newTag = res;
        this.toast.setMessage('Tag successfully created.', 'success');
        this.router.navigate(['/tag']);
      },
      error => console.log(error),
    );
  }

  deleteTag(tag) {
    if (window.confirm('Are you sure you want to permanently delete this tag?')) {
      this.tagService.deleteTag(tag).subscribe(
        res => {
          this.toast.setMessage('Tag successfully deleted.', 'success');
          this.router.navigate(['/tag']);
        },
        error => console.log(error),
      );
    }
  }

}
