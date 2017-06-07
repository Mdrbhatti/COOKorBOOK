import { CookOrBookPage } from './app.po';

describe('cook-or-book App', () => {
  let page: CookOrBookPage;

  beforeEach(() => {
    page = new CookOrBookPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
