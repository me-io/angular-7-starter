import { $$, browser } from 'protractor';

export class Angular2FullStackPage {
  navigateTo($des) {
    return browser.get($des);
  }

  getTitle() {
    return browser.getTitle();
  }

  getNavbarElement(n) {
    return $$('app-root a').get(n).getText();
  }

  getFooter(n) {
    return browser.$$('footer').get(n).getText();
  }
}
