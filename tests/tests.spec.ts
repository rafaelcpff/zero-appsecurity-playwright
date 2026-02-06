import { test, expect, ViewportSize } from '@playwright/test';
import { NavigationSteps } from '../steps/NavigationSteps';
import { Navigation } from '@pages/Navigation';
import { FeedbackSteps } from 'steps/FeedbackSteps';
import { INVALID_EMAILS, PAGES, RESPONSIVE_DEVICES } from '@fixtures/testData';

test.describe('Navigation visible across internal tabs', () => {
    test('navigation appears consistently on Home, Online Banking and Feedback', async ({ page }) => {
        const navigationPage = new Navigation(page);
        const navSteps = new NavigationSteps(page);

        await navigationPage.open();
        await expect(navigationPage.navigationContainer).toBeVisible();
        await expect(navigationPage.homeLink).toBeVisible();
        await expect(navigationPage.onlineBankingLink).toBeVisible();
        await expect(navigationPage.feedbackLink).toBeVisible();

        await navigationPage.goToOnlineBanking();
        expect(await navSteps.getCurrentUrl()).toMatch(/online-banking\.html/);
        await expect(navigationPage.navigationContainer).toBeVisible();
        await expect(navigationPage.homeLink).toBeVisible();
        await expect(navigationPage.onlineBankingLink).toBeVisible();
        await expect(navigationPage.feedbackLink).toBeVisible();

        await navigationPage.goToFeedback();
        expect(await navSteps.getCurrentUrl()).toMatch(/feedback\.html/);
        await expect(navigationPage.navigationContainer).toBeVisible();
        await expect(navigationPage.homeLink).toBeVisible();
        await expect(navigationPage.onlineBankingLink).toBeVisible();
        await expect(navigationPage.feedbackLink).toBeVisible();
    });
});

test.describe('Responsive layout', () => {
    for (const [deviceName, device] of Object.entries(RESPONSIVE_DEVICES)) {
        const { width, height } = device.viewport;
        test.describe(`${deviceName} (${width}x${height})`, () => {
            for (const { path, name } of PAGES) {
                test(`${name} page renders and navigation is visible`, async ({ page }) => {
                    const navigationPage = new Navigation(page);
                    const steps = new NavigationSteps(page);
                    await steps.openPageAtViewPort(path, device.viewport);

                    expect(await steps.getCurrentUrl()).toMatch(new RegExp(path.replace('/', '')));
                    await expect(navigationPage.navigationContainer).toBeVisible();
                    await expect(navigationPage.homeLink).toBeVisible();
                    await expect(navigationPage.onlineBankingLink).toBeVisible();
                    await expect(navigationPage.feedbackLink).toBeVisible();
                })
            }
        })
    }
});

let feedbackSteps: FeedbackSteps;

test.describe('Feedback validation before send', () => {
    test.beforeEach(async ({ page }) => {
        feedbackSteps = new FeedbackSteps(page);
        await feedbackSteps.openFeedback();
    });

    test('submit with empty required fields shows validation and stays on feedback page', async () => {
        await feedbackSteps.submitWithEmptyFields();

        const stillOnFeedbackPage = await feedbackSteps.isStillOnFeedbackPage();
        const formStillVisible = await feedbackSteps.isFormVisible();

        expect(
            stillOnFeedbackPage && formStillVisible,
            'Form should not successfully submit with empty fields.'
        ).toBeTruthy();
    });

    test('invalid email format is rejected and shows validation', async () => {
        await feedbackSteps.submitWithInvalidEmail('test.com');

        const stillOnFeedbackPage = await feedbackSteps.isStillOnFeedbackPage();
        const formStillVisible = await feedbackSteps.isFormVisible();

        expect(
            stillOnFeedbackPage && formStillVisible,
            'Form should not successfully submit with invalid email.'
        ).toBeTruthy();
    });

    for (const invalidEmail of INVALID_EMAILS) {
        test(`invalid email "${invalidEmail}" is rejected`, async () => {
            await feedbackSteps.submitWithInvalidEmail(invalidEmail);

            const isStillOnFeedbackPage = await feedbackSteps.isStillOnFeedbackPage();
            const formStillVisible = await feedbackSteps.isFormVisible();

            expect(
                isStillOnFeedbackPage && formStillVisible,
                `Email "${invalidEmail}" should not allow successful submit`
            ).toBeTruthy();
        });
    }

});