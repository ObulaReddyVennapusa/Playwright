
import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    UserName: string;
    Password: string; 
    productName: string;
    cvv: string;
    nameOnCard: string;
    coupoun: string;
} 
export const customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
  testDataForOrder: async ({}, use) => {
    await use({
      UserName: 'kiran907@gmail.com',
      Password: 'Test@123',
      productName: 'ZARA COAT 3',
      cvv: '465',
      nameOnCard: 'kiranReddy',
      coupoun: 'rahulshettyacademy',
    });
  },
});

  