import { BrowserContext, expect, Page } from '@playwright/test';
import RegisterPage from '../pages/register.page';
import BaseActions from './base/base.actions';
import routes from '../utils/routes.utils';

interface RegisterData {
  email: string;
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

  async enterEmail(email: string) {
    await this.registerPage.emailAdressInput.type(email);
    expect(this.registerPage.emailAdressInput).toHaveValue(email);
  }

  async enterInvalidEmail(invalidEmail: string) {
    await this.registerPage.passwordInput.type(invalidEmail);
    expect(this.registerPage.passwordInput).toHaveValue(invalidEmail);
  }

  async enterPassword(password: string) {
    await this.registerPage.passwordInput.type(password);
    expect(this.registerPage.passwordInput).toHaveValue(password);
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

  async registerUser(registerData: RegisterData) {
    await this.openMyAccount();
    await this.enterEmail(registerData.email);
    await this.enterPassword(registerData.password);
    await this.registerPage.registerBtn.click();
    await this.checkIfHomePage();
  }
}

export default RegisterActions;
