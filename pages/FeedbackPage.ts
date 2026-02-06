import { Page, Locator } from '@playwright/test';
import { Navigation } from './Navigation';

export class FeedbackPage {
    readonly navigation: Navigation;
    readonly form: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly commentInput: Locator;
    readonly submitButton: Locator;

    constructor(private page: Page) {
        this.navigation = new Navigation(page);
        this.form = page.locator('form').filter({ has: page.locator('input[type="submit"]') }).first();
        this.nameInput = this.form.getByPlaceholder('Your Name');
        this.emailInput = this.form.getByPlaceholder('Your email address');
        this.subjectInput = this.form.getByPlaceholder('Subject');
        this.commentInput = this.form.getByPlaceholder('Type your questions here...');
        this.submitButton = this.form.locator('input[type="submit"]');
    }

    async goto(): Promise<void> {
        await this.page.goto('/feedback.html');
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    async getPageTitle(): Promise<string> {
        return (await this.page.title()) || '';
    }
}