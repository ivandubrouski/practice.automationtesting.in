import BasePage from './base/base.page';

class LoginPage extends BasePage {
  get usernameInput() {
    return this.page.locator('#username');
  }

  get passwordInput() {
    return this.page.locator('#password');
  }

  get loginBtn() {
    return this.page.locator('//input[@name="login"]');
  }

  get signOutBtn() {
    return this.page.locator('//a[text()="Sign out"]');
  }

  get successLoginText() {
    return this.page.locator('//*[@class="woocommerce-MyAccount-content"]//p[1]');
  }

  get successLoginEmail() {
    return this.page.locator('//*[@class="woocommerce-MyAccount-content"]//p//strong');
  }
}

export default LoginPage;
