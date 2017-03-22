import { SimpleIdvAdminPage } from './app.po';

describe('simple-idv-admin App', () => {
  let page: SimpleIdvAdminPage;

  beforeEach(() => {
    page = new SimpleIdvAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
