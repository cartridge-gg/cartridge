import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/StarkNet ❤️ React/);
});

test.describe("Connect", () => {
  test.describe("Sign up", () => {
    test("should allow me to signup and connect to Controller", async ({
      page,
      context,
    }) => {
      await page.getByText("Connect").click();
      const modal = page.frameLocator("#cartridge-modal");
      await modal.getByText("Sign up").click();

      await expect(
        modal.getByText("Play with Cartridge Controller"),
      ).toBeVisible();
      await expect(
        modal.getByText("Create your Cartridge Controller"),
      ).toBeVisible();

      await modal.getByPlaceholder("Username").fill("test-0");

      const [authPage] = await Promise.all([
        context.waitForEvent("page"),
        modal.getByText("SIGN UP").click(),
      ]);
      await authPage.waitForLoadState();

      await expect(authPage.getByText("Create Passkey").first()).toBeVisible();
      await expect(
        authPage.getByText(
          "Your controller keys will be saved in your device's password manager",
        ),
      ).toBeVisible();

      const client = await authPage.context().newCDPSession(authPage);
      await client.send("WebAuthn.enable");
      const { authenticatorId } = await client.send(
        "WebAuthn.addVirtualAuthenticator",
        {
          options: {
            protocol: "ctap2",
            transport: "internal",
            hasResidentKey: true,
            hasUserVerification: true,
            isUserVerified: true,
            automaticPresenceSimulation: true,
          },
        },
      );
      await authPage.getByRole("button", { name: "CREATE PASSKEY" }).click();
      await authPage.waitForEvent("close");

      await expect(modal.getByAltText("Create Session")).toBeVisible();
      await expect(
        modal.getByAltText(
          "http://localhost:3002 is requesting to connect to your Cartridge Controller",
        ),
      ).toBeVisible();
      await modal.getByText("CREATE").click();

      await expect(page.getByText("Address: ")).toBeVisible();
    });
  });

  // test.describe("Log in", () => {
  //   test("should allow me to login and connect to Controller", async ({
  //     page,
  //   }) => {
  //     await page.getByText("Connect").click();
  //     const modal = page.frameLocator("#cartridge-modal");
  //     await expect(
  //       modal.getByText("Play with Cartridge Controller"),
  //     ).toBeVisible();
  //     await modal.getByPlaceholder("Username").fill("test-1");
  //     await modal.getByText("LOG IN").click();

  //     await expect(page.getByText("Address: ")).toBeVisible();
  //   });
  // });
});
