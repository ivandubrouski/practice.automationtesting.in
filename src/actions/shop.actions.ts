import { BrowserContext, expect, Page } from '@playwright/test';
import ShopPage from '../pages/register.page';
import BaseActions from './base/base.actions';

class ShopActions extends BaseActions {
  shopPage: ShopPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.shopPage = new ShopPage(page, context);
  }
  async openMyAccount() {
    await this.registerPage.myAccountBtn.click();
  }
}

export default ShopActions;
