import { Page, Locator } from '@playwright/test';

export class Navigation {
    readonly page: Page;
    readonly homeLink: Locator;
    readonly onlineBankingLink: Locator;
    readonly feedbackLink: Locator;
    readonly signinButton: Locator;
    readonly navigationContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navigationContainer = this.page.locator('#nav');
        this.homeLink = this.page.locator('#homeMenu');
        this.onlineBankingLink = this.page.locator('#onlineBankingMenu');
        this.feedbackLink = this.page.locator('#feedback');
        this.signinButton = this.page.getByRole('button', { name: /signin/i }).first();
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async isVisible(): Promise<boolean> {
        return this.navigationContainer.isVisible();
    }

    async areMainLinksVisible(): Promise<boolean> {
        const home = await this.homeLink.isVisible();
        const banking = await this.onlineBankingLink.isVisible();
        const feedback = await this.feedbackLink.isVisible();
        return home && banking && feedback;
    }

    async goToHome(): Promise<void> {
        await this.homeLink.click();
    }

    async goToOnlineBanking(): Promise<void> {
        await this.onlineBankingLink.click();
    }

    async goToFeedback(): Promise<void> {
        await this.feedbackLink.click();
    }
}