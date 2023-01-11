import { BrowserContext, expect, Page } from '@playwright/test';
import ShopPage from '../pages/shop.pages';
import BaseActions from './base/base.actions';
import shopData from '../fixture/smoke/shop.fixture';

class ShopActions extends BaseActions {
  shopPage: ShopPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.shopPage = new ShopPage(page, context);
  }

  async blockAdverticement() {
    await this.context.route('**/*', request => {
      return request.request().url().includes('googlesyndication.com') ? request.abort() : request.continue();
    });
  }

  async getPrices() {
    const prices = await this.shopPage.prices();
    const pricesDigits = await Promise.all(
      prices.map(async el => Number((await el.innerText()).replace(/[^\d.-]/g, '')))
    );
    return pricesDigits;
  }

  async filterPrice(targetAmount: number) {
    let maxPrice = await this.shopPage.maxPrice.innerText();
    Number(maxPrice.split('').splice(0, 1));
    console.log(maxPrice);
    console.log(targetAmount);

    let isCompleted = false;

    while (!isCompleted) {
      const srcBound = await this.shopPage.rangeMaxBtn.boundingBox();
      if (srcBound) {
        await this.page.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(srcBound.x - 0.5, srcBound.y + srcBound.height / 2);
        await this.page.mouse.up();
        maxPrice = await this.shopPage.maxPrice.innerText();
        Number(maxPrice.split('').splice(0, 1));
        console.log(maxPrice);

        if (Number(maxPrice) == targetAmount) {
          isCompleted = true;
        }
      }
    }
  }

  async verifyProductsSortedBy(item: string) {
    const prices = await this.getPrices();
    await this.shopPage.orderByBtn.selectOption(`${item}`);
    const pricesSorted = await this.getPrices();
    expect(prices).not.toEqual(pricesSorted);
  }

  async verifyProductsSortedASC() {
    await this.shopPage.orderByBtn.selectOption('price');
    const pricesCurrent = await this.getPrices();
    expect(pricesCurrent).toEqual(shopData.pricesASC);
  }

  async verifyProductsSortedDESC() {
    await this.shopPage.orderByBtn.selectOption('price-desc');
    const pricesCurrent = await this.getPrices();
    expect(pricesCurrent).toEqual(shopData.pricesDESC);
  }
}

export default ShopActions;
