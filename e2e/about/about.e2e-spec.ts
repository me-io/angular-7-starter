import {About} from './about.e2e';
import {Helper} from "../helper";

describe('About', () => {
  let page: About;
  let helper: Helper;

  beforeEach(() => {
    page = new About();
    helper = new Helper();

    helper.navigateTo('/about');
  });

  it('should have a about navbar item with active class', function () {
    expect(helper.getElementByClassName('active')).toBe('About');
  });

  it('should contains About', function () {
    expect(helper.getBodyElement('h5', 0)).toBe('About');
  });
});
