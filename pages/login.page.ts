import { expect, type Locator, type Page } from '@playwright/test';

export const URL = process.env['URL'];
console.log("URLexport = " + URL);

export class LoginPage {

  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator("input[type='email']");
    this.passwordField = page.locator("input[type='password']");
    this.submitButton = page.locator("input[type='submit']");
    this.logo = page.locator("img[alt='Objectivity Logo']");
  }

  async goto() {
    await this.page.goto(URL as string);;
  }

  async login(username: string , password: string) {
    await this.emailField.waitFor({ state: "visible", timeout: 5000 });
    await this.emailField.fill(username);
    await this.submitButton.click();
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

}
