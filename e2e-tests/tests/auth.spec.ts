import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";
test("should allow th user to sign in", async ({ page }) => {
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

test("should allow the user to register", async ({ page }) => {
  const testEmail=`test_register_${Math.floor(Math.random()*90000)+10000}@test.com`
  await page.goto(UI_URL);

  // !get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.getByRole("link", { name: "Create an account here" }).click();

  await expect(
    page.getByRole("heading", { name: "Create An Account" })
  ).toBeVisible();

  // !get the email input
  await page.locator('input[name="email"]').fill(testEmail);
  // !get the password input
  await page.locator('input[name="password"]').fill("123456789");

  // !get the confirm-password input
  await page.locator('input[name="confirmPassword"]').fill("123456789");

  // !get the first name input

  await page.locator('input[name="firstName"]').fill("test");
  // !get the last name input
  await page.locator('input[name="lastName"]').fill("rao");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Successful")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
