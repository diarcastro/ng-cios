import { NgCiosPage } from './app.po';

describe('ng-cios App', () => {
  let page: NgCiosPage;

  beforeEach(() => {
    page = new NgCiosPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
