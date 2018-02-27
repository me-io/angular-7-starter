import {Register} from './register.e2e';
import {Helper} from "../../helper";
import {browser, by, element} from "protractor";

describe('Register', () => {
  let page: Register;
  let helper: Helper;

  beforeEach(() => {
    page = new Register();
    helper = new Helper();

    helper.navigateTo('/account/register');
  });

  it('should have a register navbar item with active class', () => {
    expect(helper.getElementByClassName('active')).toBe('Register');
  });

  it('should contains Register', function () {
    expect(helper.getBodyElement('h5', 0)).toBe('Register');
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
