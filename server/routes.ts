import * as express from 'express';

import GroupCtrl from './controllers/group';
import UserCtrl from './controllers/user';
import ContactCtrl from './controllers/contact';

export default function setRoutes(app) {

  const router = express.Router();

  const contactCtrl = new ContactCtrl();
  const groupCtrl = new GroupCtrl();
  const userCtrl = new UserCtrl();


  // Contacts
  router.route('/contacts').get(contactCtrl.getAll);
  router.route('/contacts/count').get(contactCtrl.count);
  router.route('/contact').post(contactCtrl.insert);
  router.route('/contact/:id').get(contactCtrl.get);
  router.route('/contact/:id').put(contactCtrl.update);
  router.route('/contact/:id').delete(contactCtrl.delete);

  // Groups
  router.route('/groups').get(groupCtrl.getAll);
  router.route('/groups/count').get(groupCtrl.count);
  router.route('/group').post(groupCtrl.insert);
  router.route('/group/:id').get(groupCtrl.get);
  router.route('/group/:id').put(groupCtrl.update);
  router.route('/group/:id').delete(groupCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/register').post(userCtrl.insert);
  // router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
