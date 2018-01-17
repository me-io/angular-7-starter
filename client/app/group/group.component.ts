import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { GroupService } from './services/group.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

  //
  group = {};
  groupArr = [];
  isLoading = true;
  isEditing = false;

  addGroupForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private groupService: GroupService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getGroups();
    this.addGroupForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
    });
  }

  getGroups() {
    this.groupService.getGroups().subscribe(
      data => this.groupArr = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addGroup() {
    this.groupService.addGroup(this.addGroupForm.value).subscribe(
      res => {
        const newGroup = res;
        this.groupArr.push(newGroup);
        this.addGroupForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(group) {
    this.isEditing = true;
    this.group = group;
  }

  cancelEditing() {
    this.isEditing = false;
    this.group = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the group to reset the editing
    this.getGroups();
  }

  editGroup(group) {
    this.groupService.editGroup(group).subscribe(
      res => {
        this.isEditing = false;
        this.group = group;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteGroup(group) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.groupService.deleteGroup(group).subscribe(
        res => {
          const pos = this.groupArr.map(elem => elem._id).indexOf(group._id);
          this.groupArr.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
