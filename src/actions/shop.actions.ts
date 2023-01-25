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

  async getPrices() {
    const prices = await this.shopPage.prices();
    const pricesDigits = await Promise.all(
      prices.map(async el => Number((await el.innerText()).replace(/[^\d.-]/g, '')))
    );
    return pricesDigits;
  }
  /*still in progress...*/
  async filterPrice(targetAmount: number) {
    for (let i = 0; i < targetAmount; ) {
      await this.page.keyboard.press('ArrowLeft');
    }
  }
  /**/
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
