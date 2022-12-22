import { BrowserContext, expect, Page } from '@playwright/test';
import RegisterPage from '../pages/register.page';
import BaseActions from './base/base.actions';
import routes from '../utils/routes.utils';

interface RegisterData {
  email: string;
  invalidEmail: string;
  password: string;
}

class RegisterActions extends BaseActions {
  registerPage: RegisterPage;

  url = 'https://practice.automationtesting.in/my-account/';

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.registerPage = new RegisterPage(page, context);
  }

  async openMyAccount() {
    await this.registerPage.myAccountBtn.click();
    if (this.registerPage.modalWindow) {
      await this.registerPage.modalWindowCloseBtn.click();
    }
  }

  async enterEmail(emailInput: string, email: string) {
    await this.page.locator(emailInput).type(email);
    expect(this.page.locator(emailInput)).toHaveValue(email);
  }

  async enterPassword(passwordInput: string, password: string) {
    await this.page.locator(passwordInput).type(password);
    await expect(this.page.locator(passwordInput)).toHaveValue(password);
  }

  async checkIfRegisteredSuccess(email: string) {
    const hello = await this.registerPage.successRegistrationText.innerText();
    const greetingName = await this.registerPage.successRegistrationEmail.innerText();
    const partOfEmail = email.split('@')[0];
    expect(hello).toContain('Hello');
    expect(greetingName).toEqual(partOfEmail);
  }

  async checkIfHomePage() {
    await expect(this.page).toHaveURL(this.url);
  }

  async checkErrorEmailInvalidMessage(inputsID: string) {
    const validationMessage: string = await this.page.$eval(inputsID, elem => elem.validationMessage);
    expect(validationMessage.length).toBeGreaterThan(0);
  }

  async checkErrorMessage() {
    await expect(this.registerPage.errorMessage).toBeVisible();
  }
}

export default RegisterActions;
