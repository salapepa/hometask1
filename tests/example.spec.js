// @ts-check
import { test, expect } from '@playwright/test';


test('Perform Login', async ({ page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button",{ name: 'Login'}).click();
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  const countItems = await page.locator('[data-test="inventory-item"]').count();
  await expect(countItems).toBeGreaterThan(1);
});

test('Add product to the cart', async ({ page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button",{ name: 'Login'}).click();
  await expect(page).toHaveURL(/inventory.html/);
  const firstItemName = await page.locator('[data-test="inventory-item-description"]').locator('[data-test="inventory-item-name"]').first().innerText();
  console.log(firstItemName);
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText("1");
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(await page.locator('[data-test="inventory-item"]').count()).toEqual(1);
  await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: firstItemName })).toBeVisible();
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(await page.locator('[data-test="inventory-item"]').count()).toEqual(0);
});
