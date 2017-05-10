import { NgClockPage } from './app.po';

describe('ng-clock App', () => {
  let page: NgClockPage;

  beforeEach(() => {
    page = new NgClockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
