import BasePage from './base/base.page';

class RegisterPage extends BasePage {
  get myAccountBtn() {
    return this.page.locator('//a[@href="https://practice.automationtesting.in/my-account/"]');
  }

  get modalWindow() {
    return this.page.locator('#ad_position_box');
  }

  get modalWindowCloseBtn() {
    return this.page.locator('#dismiss-button');
  }

  get registerBtn() {
    return this.page.locator('//input[@name="register"]');
  }

  get successRegistrationText() {
    return this.page.locator('//*[@class="woocommerce-MyAccount-content"]//p[1]');
  }

  get successRegistrationEmail() {
    return this.page.locator('//*[@class="woocommerce-MyAccount-content"]//p//strong');
  }

  get errorMessage() {
    return this.page.locator('.woocommerce-error li');
  }
}

export default RegisterPage;
