import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {

    }

    async goto(path: string = '') {
        const url = path ? `/${path}` : '/index.html';
        await this.page.goto(url);
    }
}