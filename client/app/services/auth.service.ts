import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from '../util/helpers/jwt.helper';

import { UserService } from './user.service';
import { User } from '../shared/models/user.model';

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
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      },
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  getInitials = (name) => {
    console.log(name);
    const parts = name.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0];
      }
    }
    return initials.toUpperCase();
  };

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser = decodedUser;
    const fullName = (decodedUser.firstname || '') + ' ' + (decodedUser.lastname || '');
    this.currentUser.initials = this.getInitials(fullName.trim() || decodedUser.email);

    this.currentUser.role = decodedUser.role;

    decodedUser.role === 'super_admin' ? this.isSuperAdmin = true : this.isSuperAdmin = false;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;

    decodedUser.role === 'super_moderator' ? this.isSuperMod = true : this.isSuperMod = false;
    decodedUser.role === 'moderator' ? this.isMod = true : this.isMod = false;

    decodedUser.role === 'support_admin' ? this.isSupportAdmin = true : this.isSupportAdmin = false;
    decodedUser.role === 'support_agent' ? this.isSupportAgent = true : this.isSupportAgent = false;

    delete decodedUser.role;
  }

}
