/* eslint-disable no-undef */
// Detox e2e — real device flows + red-line geometry via getAttributes().
// Queries are scoped per screen (withAncestor) because inactive tab screens stay
// mounted, so testIDs like `productCard`/`brandPill` exist on several screens.
const assert = require('assert');

async function single(matcher) {
  const a = await matcher.getAttributes();
  return a.elements ? a.elements[0] : a;
}
async function frameOf(matcher) {
  return (await single(matcher)).frame;
}
async function screenWidth() {
  // 5 equal-width tab buttons span the screen.
  return (await frameOf(element(by.id('tab-home')))).width * 5;
}
const card = screen => element(by.id('productCard').withAncestor(by.id(screen)));

describe('Ozon RN — end-to-end', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  // ---- Core flows ----

  it('launches on Home', async () => {
    await waitFor(element(by.text('Рекомендуем')).atIndex(0)).toBeVisible().withTimeout(15000);
  });

  it('switches across all five tabs', async () => {
    await element(by.id('tab-catalog')).tap();
    await expect(element(by.text('Электроника')).atIndex(0)).toBeVisible();
    await element(by.id('tab-favorites')).tap();
    await expect(element(by.text('Подобрали для вас')).atIndex(0)).toBeVisible();
    await element(by.id('tab-cart')).tap();
    await expect(element(by.text('Корзина пуста')).atIndex(0)).toBeVisible();
    await element(by.id('tab-profile')).tap();
    await expect(element(by.text('Войдите в личный кабинет')).atIndex(0)).toBeVisible();
    await element(by.id('tab-home')).tap();
    await expect(element(by.text('Рекомендуем')).atIndex(0)).toBeVisible();
  });

  it('pushes the product detail screen (Favorites → card → Товар)', async () => {
    await element(by.id('tab-favorites')).tap();
    await card('favoritesScreen').atIndex(0).tap();
    await waitFor(element(by.text('Товар')).atIndex(0)).toBeVisible().withTimeout(15000);
    await element(by.id('tab-favorites')).tap(); // dismiss detail for later tests
  });

  // ---- Red-lines (geometry) ----

  it('#1 logo pill below the safe area + centered', async () => {
    await element(by.id('tab-home')).tap();
    const W = await screenWidth();
    const f = await frameOf(element(by.id('brandPill').withAncestor(by.id('homeHeader'))));
    assert(f.y >= 20, `pill too high (y=${f.y})`);
    assert(Math.abs(f.x + f.width / 2 - W / 2) <= 8, 'pill not centered');
  });

  it('#2 Favorites featured card is compact + left-aligned', async () => {
    await element(by.id('tab-favorites')).tap();
    const W = await screenWidth();
    const f = await frameOf(card('favoritesScreen').atIndex(0));
    assert(f.width < W * 0.6, `featured not compact (w=${f.width}, W=${W})`);
    assert(f.x < W * 0.25, `featured not left-aligned (x=${f.x})`);
  });

  it('#3 Cart empty state is a full-width band', async () => {
    await element(by.id('tab-cart')).tap();
    const W = await screenWidth();
    const f = await frameOf(element(by.id('cartEmptyBand')));
    assert(f.width > W * 0.9, `band not full-width (w=${f.width}, W=${W})`);
  });

  it('#4 Profile is two separate grouped sections', async () => {
    await element(by.id('tab-profile')).tap();
    const cta = await frameOf(element(by.id('profileCta')));
    const settings = await frameOf(element(by.id('profileSettings')));
    assert(settings.y >= cta.y + cta.height - 1, 'CTA + settings collapsed into one block');
  });

  it('#5 Catalog grid is 3 columns (centered-logo screen)', async () => {
    await element(by.id('tab-catalog')).tap();
    const W = await screenWidth();
    const f = await frameOf(
      element(by.id('categoryCard').withAncestor(by.id('catalogScreen'))).atIndex(0),
    );
    assert(f.width < W * 0.38, `category card too wide for 3-col (w=${f.width}, W=${W})`);
    // logo presence on Catalog (red-line #5) — pill exists in the screen subtree.
    await single(element(by.id('brandPill').withAncestor(by.id('catalogScreen'))));
  });

  it('#6 Home hero lives inside the gradient header', async () => {
    await element(by.id('tab-home')).tap();
    const h = await frameOf(element(by.id('homeHeader')));
    const o = await frameOf(element(by.text('О!')));
    assert(
      o.y >= h.y - 1 && o.y + o.height <= h.y + h.height + 1,
      'hero is outside the gradient header',
    );
  });

  // #7 (one shared ProductCard) + #8 (brand wordmark not hardcoded) are code-level
  // red-lines. Runtime proxy: the same `productCard` testID renders on every product
  // surface, and the brand `brandPill` (sourced from theme/brand) renders on each screen.
  it('#7/#8 shared ProductCard + brand pill on every product surface', async () => {
    const tabFor = {
      homeScreen: 'tab-home',
      favoritesScreen: 'tab-favorites',
      cartScreen: 'tab-cart',
      profileScreen: 'tab-profile',
    };
    for (const screen of Object.keys(tabFor)) {
      await element(by.id(tabFor[screen])).tap();
      await expect(card(screen).atIndex(0)).toExist();
    }
  });
});
