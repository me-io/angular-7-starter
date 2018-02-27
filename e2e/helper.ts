import {browser, by, element} from "protractor";

export class Helper {
  navigateTo($des: string) {
    return browser.get($des);
  }

  getElementByClassName(className: string) {
    return element(by.css(`.${className}`)).getWebElement().getText();
  }

  getBodyElement(tagName: string, n: number) {
    return browser.$$(tagName).get(n).getText();
  }

  getTitle() {
    return browser.getTitle();
  }

  navigateTo($des: string) {
    return browser.get($des);
  }
}
