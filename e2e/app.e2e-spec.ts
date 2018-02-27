import {Angular2FullStackPage} from './app.po';
import {browser, by, element} from "protractor";

describe('angular2-full-stack App', () => {
  let page: Angular2FullStackPage;

  beforeEach(() => {
    page = new Angular2FullStackPage();
  });

  it('should have a title', () => {
    page.navigateTo('/');

    expect(page.getTitle()).toEqual('WEB Project');
  });

  it('should display the navbar correctly', () => {
    page.navigateTo('/');

    expect(page.getNavbarElement(0)).toEqual('Angular 2 Starter');
    expect(page.getNavbarElement(1)).toEqual('About');
    expect(page.getNavbarElement(2)).toEqual('Register');
    expect(page.getNavbarElement(3)).toEqual('Login');
  });

  it('should display footer correctly', () => {
    page.navigateTo('/');

    expect(page.getFooter(0)).toEqual('Copyright © Angular 2 Starter 2018');
  });

  it('should contain the posts', () => {
    page.navigateTo('/');

    expect(browser.$$('h5').get(0).getText()).toEqual('Posts');
  });

  it('should contain the tags', () => {
    page.navigateTo('/');

    expect(browser.$$('h5').get(1).getText()).toEqual('Tags');
  });
});
