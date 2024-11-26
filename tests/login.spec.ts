import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

test('logged into KP', async ({ page }) => {

  await page.goto('/settings');

  const emailField = page.locator("input[type='email']");
  const passwordField = page.locator("input[type='password']");
  const submitButton = page.locator("input[type='submit']");
  const logo = page.locator("img[alt='Objectivity Logo']");

  await emailField.waitFor({ state: "visible"});

  await emailField.fill(process.env.LOGIN as string);
  await submitButton.click();
  await passwordField.fill(process.env.PASSWORD as string);
  await submitButton.click();
  //await noButton.click();  

  await logo.waitFor({ state: "visible"});
  await logo.click();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('list')).toContainText('My skills');

});

test('not logged into KP', async ({ page }) => {

  await page.goto('/settigs');

  const emailField = page.locator("input[type='email']");
  const passwordField = page.locator("input[type='password']");
  const submitButton = page.locator("input[type='submit']");
  const passwordError = page.locator("#passwordError");

  await emailField.waitFor({ state: "visible"});
  await emailField.fill("T275970.2@ds.dev.accenture.com");
  await submitButton.click();

  await passwordField.fill("WrongPass");
  await submitButton.click();

  await expect(passwordError).toContainText("Your account or password is incorrect. If you don't remember your password, reset it now.");

});
