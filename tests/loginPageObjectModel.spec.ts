import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

 test('logged into KP via POM', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.LOGIN as string, process.env.PASSWORD as string);

  const logo = page.locator("img[alt='Objectivity Logo']");
  await logo.waitFor({ state: "visible"});
  await logo.click();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('list')).toContainText('My skills');
  await expect(page).toHaveScreenshot();
})

test('failing login test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("T275970.2@ds.dev.accenture.com", "wrongPass");

  const logo = page.locator("img[alt='Objectivity Logo']");
  await logo.waitFor({ state: "visible", timeout: 5000 });
  await logo.click();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('list')).toContainText('My skills');
})