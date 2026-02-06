import { Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { Navigation } from '@pages/Navigation';
import { isModuleNamespaceObject } from 'node:util/types';

export type ViewPortSize = {
    width: number;
    height: number;
};

export class NavigationSteps {
    private readonly basePage: BasePage;
    private readonly navigation: Navigation;

    constructor(private readonly page: Page) {
        this.basePage = new BasePage(page);
        this.navigation = new Navigation(page);
    }

    async openHome(): Promise<void> {
        await this.basePage.goto();
    }

    async goToOnlineBanking(): Promise<void> {
        await this.navigation.goToOnlineBanking();
    }

    async goToFeedback(): Promise<void> {
        await this.navigation.goToFeedback();
    }

    async goToHome(): Promise<void> {
        await this.navigation.goToHome();
    }

    async openPath(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async openPageAtViewPort(path: string, viewport: ViewPortSize): Promise<void> {
        await this.page.setViewportSize(viewport);
        await this.page.goto(path);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

}