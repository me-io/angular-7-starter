import {Dashboard} from './dashboard.e2e';
import {Helper} from "../helper";

describe('Dashboard', () => {
  let page: Dashboard;
  let helper: Helper;

  beforeEach(() => {
    page = new Dashboard();
    helper = new Helper();

    helper.navigateTo('/');
  });

  it('should have a title', () => {
    expect(helper.getTitle()).toEqual('WEB Project');
  });

  it('should display the navbar correctly', () => {
    expect(page.getNavbarElement(0)).toEqual('Angular 7 Starter');
    expect(page.getNavbarElement(1)).toEqual('About');
    expect(page.getNavbarElement(2)).toEqual('Register');
    expect(page.getNavbarElement(3)).toEqual('Login');
  });

  it('should display footer correctly', () => {
    expect(page.getFooter(0)).toEqual('Copyright © Angular 7 Starter 2018');
  });

  it('should contain the posts', () => {
    expect(helper.getBodyElement('h5', 0)).toEqual('Posts');
  });

  it('should contain the tags', () => {
    expect(helper.getBodyElement('h5', 1)).toEqual('Tags');
  });
});
