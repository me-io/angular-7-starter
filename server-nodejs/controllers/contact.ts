import Contact from '../models/contact';
import BaseUserCtrl from './base.user';

export default class ContactCtrl extends BaseUserCtrl {
  model = Contact;
}
