import { BrowserContext, expect, Page } from '@playwright/test';
import config from '../../playwright.config';

import LoginPage from '../pages/login.page';
import BaseActions from './base/base.actions';

class LoginActions extends BaseActions {
  loginPage: LoginPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.loginPage = new LoginPage(page, context);
  }

  async enterUsername(username: string) {
    await this.loginPage.usernameInput.type(username);
    expect(this.loginPage.usernameInput).toHaveValue(username);
  }

  async enterPassword(password: string) {
    await this.loginPage.passwordInput.type(password);
    expect(this.loginPage.passwordInput).toHaveValue(password);
  }

  async clickLoginBtn() {
    await this.loginPage.loginBtn.click();
  }

  async clickSignOutBtn() {
    await this.loginPage.signOutBtn.click();
  }
  async checkIfLoginSuccess(email: string) {
    const hello = await this.loginPage.successLoginText.innerText();
    const greetingName = await this.loginPage.successLoginEmail.innerText();
    const partOfEmail = email.split('@')[0];
    expect(hello).toContain('Hello');
    expect(greetingName).toEqual(partOfEmail);
  }

  async typeMarkedPassword() {
    expect(await this.loginPage.passwordInput.getAttribute('type')).toEqual('password');
  }

  async checkIfHomePage() {
    await expect(this.page).toHaveURL(config.use.baseURL);
  }
}

export default LoginActions;
