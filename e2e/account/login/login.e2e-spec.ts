import {Login} from './login.e2e';
import {Helper} from "../../helper";
import {browser, by, element} from "protractor";

describe('Login', () => {
  let page: Login;
  let helper: Helper;

  beforeEach(() => {
    page = new Login();
    helper = new Helper();

    helper.navigateTo('/account/login');
  });

  it('should have a login navbar item with active class', () => {
    expect(helper.getElementByClassName('active')).toBe('Login');
  });

  it('should contains Login', function () {
    expect(helper.getBodyElement('h5', 0)).toBe('Login');
  });

  it('should have email field', function () {
    const emailInput = element(by.id('email')).getAttribute('name');
    expect(emailInput).toBe('email');
  });

  it('should have password field', function () {
    const emailInput = element(by.id('password')).getAttribute('name');
    expect(emailInput).toBe('password');
  });
});
