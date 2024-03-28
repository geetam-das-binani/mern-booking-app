import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";

test("should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL);
    await page.locator('input[name="destination"]').fill('France')

    await page.getByRole('button', { name: 'Search' }).click();

    await expect(
        page.locator('text="Hotels Found in France"')
      ).toBeVisible();
      await expect(
        page.locator('text="Dublin Gateways 1234"')
      ).toBeVisible();
    
})