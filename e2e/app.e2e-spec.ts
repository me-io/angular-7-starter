import { Angular2FullStackPage } from './app.po';

describe('angular2-full-stack App', () => {
  let page: Angular2FullStackPage;

  beforeEach(() => {
    page = new Angular2FullStackPage();
  });

  it('should display the navbar correctly', () => {
    page.navigateTo();
    expect(page.getNavbarElement(0)).toEqual('Angular 2 Starter');
    expect(page.getNavbarElement(1)).toEqual('About');
    expect(page.getNavbarElement(2)).toEqual('Register');
    expect(page.getNavbarElement(3)).toEqual('Login');
  });
});
