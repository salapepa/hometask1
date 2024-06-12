import { test, expect } from '@playwright/test';

test('login @12345 ', async ({ page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button",{ name: 'Submit'}).click();
    await page.pause();
    await expect(page).toHaveURL(/dashboard/);
    await page.locator('.icon-settings').click();
    await page.getByRole("button",{ name: 'Expand'}).first().click();
    await page.locator('.personal-info-profile-pic').click();
    await page.getByRole("button",{ name: 'Upload photo'}).click();
    const fileChooser = await fileChooserPromise;
        const absolutePath = resolve(
          process.cwd(),
          'tests/jpg.jpg',
        );
  
        await fileChooser.setFiles(absolutePath);
        await page.getByRole('button', {
          name: 'Set as profile photo',
        }).click();
  
        await expect(page.locator('.personal-info-profile-pic[style*=".s3.amazonaws.com"]')).toBeVisible();
  });