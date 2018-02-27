import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelper} from '../util/helpers/jwt.helper';

import {UserService} from './user.service';
import {User} from '../shared/models/user.model';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  loggedIn = false;
  isSuperAdmin = false;
  isAdmin = false;
  isSuperMod = false;
  isMod = false;
  isSupportAdmin = false;
  isSupportAgent = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser: User = new User();

  constructor(private userService: UserService,
              private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(
      res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          const decodedUser = this.decodeUserFromToken(res.token);
          this.setCurrentUser(decodedUser);
          return this.loggedIn;
        } else {
          throw new Error('Invalid Credentials');
        }
      },
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isSuperAdmin = false;
    this.isAdmin = false;
    this.isSuperMod = false;
    this.isMod = false;
    this.isSupportAdmin = false;
    this.isSupportAgent = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    try {
      return this.jwtHelper.decodeToken(token).data;
    } catch (err) {
      this.logout();
      return {};
    }
  }

  getInitials = (name = '') => {
    const parts = name.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0];
      }
    }
    return initials.toUpperCase();
  }

  setUserRole = (role) => {
    switch (role) {
      case 'super_admin':
        this.isSuperAdmin = true;
        break;
      case 'admin':
        this.isAdmin = true;
        break;
      case 'super_moderator':
        this.isSuperMod = true;
        break;
      case 'moderator':
        this.isMod = true;
        break;
      case 'support_admin':
        this.isSupportAdmin = true;
        break;
      case 'support_agent':
        this.isSupportAgent = true;
        break;
      default:

    }
  }

  setCurrentUser(decodedUser: any = {}) {
    this.loggedIn = true;
    this.currentUser = decodedUser;
    const fullName = (decodedUser.firstname || '') + ' ' + (decodedUser.lastname || '');
    this.currentUser.initials = this.getInitials(fullName.trim() || decodedUser.email);

    this.currentUser.role = decodedUser.role;

    this.setUserRole(decodedUser.role);
    delete decodedUser.role;
  }

}
