import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://knowledge-uat.objectivity.co.uk/')
  await page.getByPlaceholder('Email, phone, or Skype').fill('knowledge_test1@objectivity.co.uk');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Z68fPk~-AbT1YdU4ozDmBC.7aOlv_');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'No' }).click();
  
  const slowExpect = expect.configure({ timeout: 10000 });
  await slowExpect(page.locator('home-page')).toContainText('Skill matrix');
});