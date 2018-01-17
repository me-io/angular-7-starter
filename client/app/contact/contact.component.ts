import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ContactService } from './services/contact.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  //
  contact = {};
  contactArr = [];
  isLoading = true;
  isEditing = false;

  addContactForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private contactService: ContactService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) {
  }

  ngOnInit() {
    this.getContacts();
    this.addContactForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
    });
  }

  getContacts() {
    this.contactService.getContacts().subscribe(
      data => this.contactArr = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addContact() {
    this.contactService.addContact(this.addContactForm.value).subscribe(
      res => {
        const newContact = res;
        this.contactArr.push(newContact);
        this.addContactForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(contact) {
    this.isEditing = true;
    this.contact = contact;
  }

  cancelEditing() {
    this.isEditing = false;
    this.contact = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the contact to reset the editing
    this.getContacts();
  }

  editContact(contact) {
    this.contactService.editContact(contact).subscribe(
      res => {
        this.isEditing = false;
        this.contact = contact;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteContact(contact) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.contactService.deleteContact(contact).subscribe(
        res => {
          const pos = this.contactArr.map(elem => elem._id).indexOf(contact._id);
          this.contactArr.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
