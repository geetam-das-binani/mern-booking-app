import path from "path";
import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";
test.beforeEach(async ({ page }) => {
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
});

test("should allow  the user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await expect(page.getByRole("heading", { name: "Add Hotel" })).toBeVisible();

  await page.locator("#name").fill("Hotel Name");

  await page
    .locator("#description")
    .fill("Hotel Description for the test hotel");

  await page.locator("#city").fill("Hotel Location");
  await page.locator("#country").fill("Hotel country");
  await page.locator("#pricePerNight").fill("100");
  await page.selectOption("#starRating", "3");
  await page.getByText("Budget").click();

  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();
  await page.locator("#adultCount").fill("3");
  await page.locator("#childCount").fill("1");

  await page.setInputFiles("#file", [path.join(__dirname, "files", "1.jpg")]);
  //   await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel created successfully")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  await expect(page.getByText("Hotel Name")).toBeVisible();
  await expect(
    page.locator('text="Hotel Description for the test hotel"')
  ).toBeVisible();
  await expect(page.getByText("Hotel Location,Hotel country")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("₹100 per night")).toBeVisible();
  await expect(page.getByText("3 adults,1 children")).toBeVisible();
  await expect(page.getByText("3 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();
  await page.waitForSelector("#name", { state: "attached" });
  await expect(page.locator("#name")).toHaveValue("Edited Hotel Name");
  await page.locator("#name").fill("Edited Hotel Name updated");

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel updated successfully")).toBeVisible();

  await page.reload();
  await expect(page.locator("#name")).toHaveValue("Edited Hotel Name updated");
  await page.locator("#name").fill("Edited Hotel Name");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel updated successfully")).toBeVisible();
});
