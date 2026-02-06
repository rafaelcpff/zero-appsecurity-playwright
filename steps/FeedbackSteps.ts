import { Page } from '@playwright/test';
import { FeedbackPage } from '@pages/FeedbackPage';

export class FeedbackSteps {
    private readonly feedbackPage: FeedbackPage;

    constructor(private readonly page: Page) {
        this.feedbackPage = new FeedbackPage(page);
    }

    async openFeedback(): Promise<void> {
        await this.feedbackPage.goto();
    }

    async submitWithEmptyFields(): Promise<void> {
        await this.feedbackPage.submitForm();
    }

    async fillAndSubmit(name: string, email: string, subject: string, comment: string): Promise<void> {
        await this.feedbackPage.nameInput.fill(name);
        await this.feedbackPage.emailInput.fill(email);
        await this.feedbackPage.subjectInput.fill(subject);
        await this.feedbackPage.commentInput.fill(comment);
        await this.feedbackPage.submitForm();
    }

    async submitWithInvalidEmail(invalidEmail: string): Promise<void> {
        await this.fillAndSubmit('Test user', invalidEmail, 'Test subject', 'Test comment');
    }

    async isStillOnFeedbackPage(): Promise<boolean> {
        return this.page.url() === 'http://zero.webappsecurity.com/feedback.html';
    }

    async isFormVisible(): Promise<boolean> {
        return this.feedbackPage.form.isVisible();
    }
}