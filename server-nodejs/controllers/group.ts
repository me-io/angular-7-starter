import Group from '../models/group';
import BaseUserCtrl from './base.user';

export default class GroupCtrl extends BaseUserCtrl {
  model = Group;
}
