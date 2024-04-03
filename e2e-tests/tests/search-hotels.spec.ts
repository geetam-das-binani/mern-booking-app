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
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);
   await page.locator('input[name="destination"]').fill("France");
   const date = new Date();

   date.setDate(date.getDate() + 3);
  date.getTime();
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formattedDate);
  await page.getByRole("button", { name: "Search" }).click();

   await expect(page.locator('text="Hotels Found in France"')).toBeVisible();
  await expect(page.locator('text="Dublin Gateways 1234"')).toBeVisible();
   await page.getByRole("link", { name: "Dublin Gateways 1234" }).click();
   await page.getByRole("button", { name: "Book Now" }).click();
  await expect(page.getByText("Total Cost :₹9000.00")).toBeVisible();
   const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator("[placeholder=1234 1234 1234 1234]")
     .fill("4242424242424242");
  await stripeFrame.locator("[placeholder=MM / YY]").fill("12/25");
  await stripeFrame.locator("[placeholder=CVC]").fill("123");
   await page.getByRole("button", { name: "Confirm Booking" }).click();
   await expect(page.getByText("Booked successfully ")).toBeVisible();
 });

test("should show hotel bookings", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page).toHaveURL(/my-bookings/);
  await expect(
    page.getByRole("heading", { name: "My Bookings" })
  ).toBeVisible();
  await expect(page.locator('text="Cozy Cabin Retreat"')).toBeVisible();
});
