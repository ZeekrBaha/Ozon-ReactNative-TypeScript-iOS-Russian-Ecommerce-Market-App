/* eslint-disable no-undef */
// Detox e2e — real device flows: launch, tab switching across all 5 screens,
// product → detail navigation, and red-line geometry via getAttributes().
const assert = require('assert');

describe('Ozon RN — end-to-end', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  it('launches on Home', async () => {
    await waitFor(element(by.text('Рекомендуем')).atIndex(0))
      .toBeVisible()
      .withTimeout(15000);
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
    await element(by.id('productCard')).atIndex(0).tap();
    await waitFor(element(by.text('Товар')).atIndex(0))
      .toBeVisible()
      .withTimeout(15000);
  });

  // Red-line #1 — logo pill below the safe area, horizontally centered.
  it('red-line: logo pill is below the safe area and centered', async () => {
    await element(by.id('tab-home')).tap();
    const pill = await element(by.id('brandPill')).atIndex(0).getAttributes();
    const screen = await element(by.id('tab-home')).getAttributes();
    const frame = pill.elements ? pill.elements[0].frame : pill.frame;
    assert(frame.y >= 20, `pill too high (y=${frame.y})`);
    // tab button x gives a screen-width reference; assert pill roughly centered.
    const tabFrame = screen.elements ? screen.elements[0].frame : screen.frame;
    const screenWidth = tabFrame.width * 5; // 5 equal tabs span the width
    const pillCenter = frame.x + frame.width / 2;
    assert(
      Math.abs(pillCenter - screenWidth / 2) <= 8,
      `pill not centered (center=${pillCenter}, half=${screenWidth / 2})`,
    );
  });
});
