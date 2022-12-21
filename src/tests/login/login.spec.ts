import { Page } from '@playwright/test';
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

  test('Log-in with incorrect username and incorrect password', async ({ app }) => {
    await app.login.enterUsername(testData.invalidUsername);
    await app.login.enterPassword(testData.invalidPassword);
    await app.login.clickLoginBtn();
    await app.register.checkErrorMessage();
  });

  test('Log-in with correct username and empty password', async ({ app }) => {
    await app.login.enterUsername(testData.username);
    await app.login.clickLoginBtn();
    await app.register.checkErrorMessage();
  });

  test('Log-in with empty username and valid password', async ({ app }) => {
    await app.login.enterPassword(testData.password);
    await app.login.clickLoginBtn();
    await app.register.checkErrorMessage();
  });

  test('Log-in with empty username and empty password', async ({ app }) => {
    await app.login.clickLoginBtn();
    await app.register.checkErrorMessage();
  });

  test('Log-in -Password should be masked', async ({ app }) => {
    await app.login.enterPassword(testData.password);
    await app.login.typeMarkedPassword();
  });

  test('Login-Handles case sensitive', async ({ app }) => {
    await app.login.enterUsername(testData.invalidUsername.toUpperCase());
    await app.login.enterPassword(testData.invalidPassword.toUpperCase());
    await app.login.clickLoginBtn();
    await app.register.checkErrorMessage();
  });

  test('Login-Authentication', async ({ app }) => {
    await app.login.enterUsername(testData.username);
    await app.login.enterPassword(testData.password);
    await app.login.clickLoginBtn();
    await app.login.checkIfLoginSuccess(testData.username);
    await app.login.clickSignOutBtn();
    await app.base.page.goBack();
    await app.login.checkIfHomePage();
  });
});
