import { devices } from "@playwright/test";

export const INVALID_EMAILS = ['testgmail.com', 'test@.com', 'test @gmail.com'];

export const RESPONSIVE_DEVICES: Record<string, typeof devices[keyof typeof devices]> = {
    'iPhone13': devices['iPhone 13'],
    'Pixel 5': devices['Pixel 5'],
    'iPad Pro 11': devices['iPad Pro 11'],
    'Desktop Chrome': devices['Desktop Chrome'],
};

export const PAGES = [
    { path: '/index.html', name: 'Home'},
    { path: '/online-banking.html', name: 'Online Banking'},
    { path: '/feedback.html', name: 'Feedback'},
] as const;