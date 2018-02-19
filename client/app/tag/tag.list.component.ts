import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TagService } from './services/tag.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { ErrFmt } from '../util/helpers/err.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.list.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagListComponent implements OnInit {

  //
  tag = {};
  tagArr = [];
  isLoading = true;
  isEditing = false;

  addTagForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private tagService: TagService,
              private router: Router,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getTags();
    this.addTagForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
    });
  }

  getTags() {
    this.tagService.getTags().subscribe(
      data => this.tagArr = data,
      error => this.toast.setMessage(ErrFmt(error), 'danger'),
      () => this.isLoading = false,
    );
  }

  addTag() {
    this.router.navigate(['/tag/new/']);
  }

  editTag(id) {
    this.router.navigate(['/tag/edit/' + id]);
  }

  deleteTag(tag) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.tagService.deleteTag(tag).subscribe(
        res => {
          const pos = this.tagArr.map(elem => elem._id).indexOf(tag._id);
          this.tagArr.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
