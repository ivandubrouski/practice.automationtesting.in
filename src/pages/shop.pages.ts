import BasePage from './base/base.page';

class ShopPage extends BasePage {
  get maxPrice() {
    return this.page.locator('span.to');
  }

  get rangeMinBtn() {
    return this.page.locator('//span[@tabindex="0"][1]');
  }

  get rangeMaxBtn() {
    return this.page.locator('//span[@tabindex="0"][2]');
  }

  get filterBtn() {
    return this.page.locator('//button[@class="button"]');
  }

  get product() {
    return this.page.locator('.woocommerce-LoopProduct-link').nth(2);
  }

  get orderByBtn() {
    return this.page.locator('select.orderby');
  }

  get modalWindow() {
    return this.page.$$('div#card');
  }

  get modalCloseBtn() {
    return this.page.$$('#dismiss-button');
  }

  get pricesWithDiscount() {
    return this.page.$$('ins span.amount');
  }

  get pricesRegular() {
    return this.page.$$('span>.amount');
  }

  async prices() {
    const arr1 = await this.pricesWithDiscount;
    const arr2 = await this.pricesRegular;
    const res = await arr1.concat(arr2);
    return res;
  }
}

export default ShopPage;
