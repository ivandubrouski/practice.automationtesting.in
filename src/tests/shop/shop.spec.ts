import test from '../test';
import shopData from '../../fixture/smoke/shop.fixture';
import routes from '../../utils/routes.utils';

test.describe('Shop', async () => {
  test.beforeEach(async ({ app }) => {
    await app.base.navigateTo(routes.shop);
  });

  test('Shop-Default Sorting Functionality By Polularity', async ({ app }) => {
    await app.shop.verifyProductsSortedBy(shopData.options.popularity);
  });

  test('Shop-Default Sorting Functionality By Rating', async ({ app }) => {
    await app.shop.verifyProductsSortedBy(shopData.options.rating);
  });

  test('Shop-Default Sorting Functionality By Newness', async ({ app }) => {
    await app.shop.verifyProductsSortedBy(shopData.options.date);
  });

  test('Shop-Default Sorting Functionality By Price: low to high', async ({ app }) => {
    await app.shop.verifyProductsSortedASC();
  });

  test('Shop-Default Sorting Functionality By Price: high to low', async ({ app }) => {
    await app.shop.verifyProductsSortedDESC();
  });
});
