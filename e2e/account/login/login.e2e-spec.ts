import {Login} from './login.e2e';
import {Helper} from "../../helper";
import {$$, by, element} from "protractor";

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

  it('should allow user to change value of email and password inputs', function () {
    const user = {
      'email': 'john@info.com',
      'password': 'johndoe',
    };
    const emailInput = element(by.id('email'));
    const passwordInput = element(by.id('password'));

    emailInput.sendKeys(user.email);
    passwordInput.sendKeys(user.password);

    expect(emailInput.getAttribute('value')).toBe(user.email);
    expect(passwordInput.getAttribute('value')).toBe(user.password);
  });

  it('should display danger alert for wrong credentials', function () {
    const user = {
      'email': 'john@info.com',
      'password': 'johndoe',
    };

    element(by.id('email')).sendKeys(user.email);
    element(by.id('password')).sendKeys(user.password);

    element(by.buttonText('Submit')).click();

    expect($$('app-toast .alert').get(0).getText()).toBe("×\nMessage: Username not found");
  });
});
