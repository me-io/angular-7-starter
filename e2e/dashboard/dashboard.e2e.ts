import {$$, browser} from 'protractor';

export class Dashboard {
  getNavbarElement(n: number) {
    return $$('app-root a').get(n).getText();
  }

  getFooter(n: number) {
    return browser.$$('footer').get(n).getText();
  }
}
