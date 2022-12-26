import test from '../test';
import testData from '../../fixture/smoke/shop.fixture';
import routes from '../../utils/routes.utils';

test.describe('Shop', async () => {
  test.beforeEach(async ({ app }) => {
    await app.base.navigateTo(routes.shop);
  });

  test('Shop-Filter By Price Functionality', async ({ app }) => {});
});
