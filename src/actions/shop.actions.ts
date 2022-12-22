import { BrowserContext, expect, Page } from '@playwright/test';
import ShopPage from '../pages/shop.page';
import BaseActions from './base/base.actions';
//import routes from '../utils/routes.utils';

class ShopActions extends BaseActions {
  shopPage: ShopPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.shopPage = new ShopPage(page, context);
  }

  async setMaxPrice() {
    const price = await this.shopPage.maxPrice;
    await this.shopPage.maxPrice.innerText('450');
  }
}
export default ShopActions;
