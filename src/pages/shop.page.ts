import BasePage from './base/base.page';

class ShopPage extends BasePage {
  get maxPrice() {
    return this.page.locator('span .to');
  }
}

export default ShopPage;
