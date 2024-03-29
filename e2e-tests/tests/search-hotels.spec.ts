import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";
test.beforeEach("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // !get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // !get the email input
  await page.locator('input[type="email"]').fill("geetambinani6@gmail.com");
  // !get the password input
  await page.locator('input[type="password"]').fill("123456789");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign In Successful")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  await page.locator('input[name="destination"]').fill("France");

  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.locator('text="Hotels Found in France"')).toBeVisible();
  await expect(page.locator('text="Dublin Gateways 1234"')).toBeVisible();
});
test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.locator('input[name="destination"]').fill("France");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.locator('text="Hotels Found in France"')).toBeVisible();
  await expect(page.locator('text="Dublin Gateways 1234"')).toBeVisible();
  await page.getByRole("link", { name: "Dublin Gateways 1234" }).click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button",{name:"Book Now"})).toBeVisible();
});
