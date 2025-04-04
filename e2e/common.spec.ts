import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("Should load more projects", async ({ page }) => {
    await page.goto("/");

    const projectCards = page.locator(".project-card");
    await projectCards.first().waitFor();

    const loadMoreButton = page.locator(
      'button:has-text("Load More Components")',
    );
    const isLoadMoreVisible = await loadMoreButton.isVisible();

    if (isLoadMoreVisible) {
      await loadMoreButton.click();

      await page.waitForTimeout(1000);

      const newProjectCards = page.locator(".project-card");
      const initialCount = await projectCards.count();
      const newCount = await newProjectCards.count();
      expect(newCount).toBeGreaterThan(initialCount);
    } else {
      const projectCount = await projectCards.count();
      expect(projectCount).toBeGreaterThan(0);
    }
  });
});
test.describe("Login Page", () => {
  test("Login incorrecto", async ({ page }) => {
    await page.goto("login");

    await page.fill("#email", "usuario@incorrecto.com");
    await page.fill("#password", "passwordIncorrecta");

    await page.click('button[type="submit"]');

    const errorMessage = page.locator('text="Invalid identifier or password"');
    await expect(errorMessage).toBeVisible();
  });
});
