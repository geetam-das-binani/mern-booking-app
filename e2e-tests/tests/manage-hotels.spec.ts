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

  await page.locator("#description").fill("Hotel Description for the test hotel");

  await page.locator("#city").fill("Hotel Location");
  await page.locator("#country").fill("Hotel country");
  await page.locator("#pricePerNight").fill("100");
  await page.selectOption("#starRating","3")

  await page.getByText("Budget").click()

  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();

  await page.locator("#adultCount").fill("3")
  await page.locator("#childCount").fill("1")


  await page.setInputFiles("#file",[
    path.join(__dirname,"files","1.jpg"),
   
   
  ])
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel created successfully")).toBeVisible();
});
