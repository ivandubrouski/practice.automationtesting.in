import test from '../test';
import testData from '../../fixture/smoke/login.fixture';
import routes from '../../utils/routes.utils';

test.describe('Login', async () => {
  test.beforeEach(async ({ app }) => {
    await app.base.navigateTo(routes.myaccount);
  });

  test('Log-in with valid username and password', async ({ app }) => {
    await app.login.enterUsername(testData.username);
    await app.login.enterPassword(testData.password);
    await app.login.clickLoginBtn();
    await app.login.checkIfLoginSuccess(testData.username);
  });
});
