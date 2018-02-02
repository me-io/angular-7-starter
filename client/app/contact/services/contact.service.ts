import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../../shared/models/contact.model';

@Injectable()
export class ContactService {


  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('/api/contacts');
  }

  countContacts(): Observable<number> {
    return this.http.get<number>('/api/contacts/count');
  }

  addContact(contact: Contact): Observable<Contact> {
    // contact.od = {
    //   recordID: '6b2237ee0df85980',
    //   company: '',
    //   emailAddresses: [{
    //     label: 'work',
    //     email: 'carl-jung@example.com',
    //   }],
    //   familyName: 'Jung',
    //   givenName: 'Carl',
    //   jobTitle: '',
    //   middleName: '',
    //   phoneNumbers: [{
    //     label: 'mobile',
    //     number: '(555) 555-5555',
    //   }],
    //   hasThumbnail: true,
    //   thumbnailPath: 'content://com.android.contacts/display_photo/3',
    //   postalAddresses: [
    //     {
    //       street: '123 Fake Street',
    //       city: 'Sample City',
    //       state: 'CA',
    //       region: 'CA',
    //       postCode: '90210',
    //       country: 'USA',
    //       label: 'home',
    //     },
    //   ],
    // };

    return this.http.post<Contact>('/api/contact', contact);
  }

  getContact(contact: Contact): Observable<Contact> {
    return this.http.get<Contact>(`/api/contact/${contact._id}`);
  }

  editContact(contact: Contact): Observable<string> {
    // contact.od = {
    //   recordID: '6b2237ee0df85980',
    //   company: '',
    //   emailAddresses: [{
    //     label: 'work',
    //     email: 'carl-jung@example.com',
    //   }],
    //   familyName: 'Jung',
    //   givenName: 'Carl',
    //   jobTitle: '',
    //   middleName: '',
    //   phoneNumbers: [{
    //     label: 'mobile',
    //     number: '(555) 555-5555',
    //   }],
    //   hasThumbnail: true,
    //   thumbnailPath: 'content://com.android.contacts/display_photo/3',
    //   postalAddresses: [
    //     {
    //       street: '123 Fake Street',
    //       city: 'Sample City',
    //       state: 'CA',
    //       region: 'CA',
    //       postCode: '90210',
    //       country: 'USA',
    //       label: 'home',
    //     },
    //   ],
    // };
    return this.http.put(`/api/contact/${contact._id}`, contact, { responseType: 'text' });
  }

  deleteContact(contact: Contact): Observable<string> {
    return this.http.delete(`/api/contact/${contact._id}`, { responseType: 'text' });
  }

}
