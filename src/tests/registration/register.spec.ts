import test from '../test';
import testData from '../../fixture/smoke/register.fixture';
import routes from '../../utils/routes.utils';

test.describe('Registration', async () => {
  test.beforeEach(async ({ app }) => {
    await app.base.navigateTo(routes.myaccount);
  });

  test('Sign in', async ({ app }) => {
    await app.register.enterEmail(testData.inputsID.emailInput, testData.registerData.email);
    await app.register.enterPassword(testData.inputsID.passwordInput, testData.registerData.password);
    await app.register.registerPage.registerBtn.click();
    await app.register.checkIfRegisteredSuccess(testData.registerData.email);
    await app.register.checkIfHomePage();
  });

  test('with invalid email ID', async ({ app }) => {
    await app.register.enterInvalidEmail(testData.inputsID.emailInput, testData.registerData.invalidEmail);
    await app.register.enterPassword(testData.inputsID.passwordInput, testData.registerData.password);
    await app.register.registerPage.registerBtn.click();
    await app.register.checkErrorEmailInvalidMessage(testData.inputsID.emailInput);
  });

  test('with empty email ID', async ({ app }) => {
    await app.register.enterPassword(testData.inputsID.passwordInput, testData.registerData.password);
    await app.register.registerPage.registerBtn.click();
    await app.register.checkErrorMessage();
  });

  test('with empty password', async ({ app }) => {
    await app.register.enterEmail(testData.inputsID.emailInput, testData.registerData.email);
    await app.register.registerPage.registerBtn.click();
    await app.register.checkErrorMessage();
  });

  test('with empty email & password', async ({ app }) => {
    await app.register.registerPage.registerBtn.click();
    await app.register.checkErrorMessage();
  });
});
