import BasePage from './base/base.page';

class ShopPage extends BasePage {
  get maxPrice() {
    return this.page.locator('span .to');
  }

  get rangeMinBtn() {
    return this.page.locator('//span[@tabindex="0"][1]');
  }

  get rangeMaxBtn() {
    return this.page.locator('//span[@tabindex="0"][2]');
  }
}

export default ShopPage;
