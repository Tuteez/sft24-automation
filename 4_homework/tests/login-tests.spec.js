
import { test } from "@playwright/test";
import { UserLogin } from "../pages/user-login-page";
import { testData } from "../data/testData"

const validUsers = [
  testData.standardUser,
  // testData.problemUser,
  // testData.performanceGlitchUser,
  // testData.errorUser,
  // testData.visualUser,
];

const invalidUsers = [
  testData.lockedOutUser,
  testData.invalidUser,
  testData.emptyUser,
  testData.emptyPassword,
  testData.emptyUsername,
];

test.describe("Validate successfull logins", () => {
  let userLogin;
  test.beforeEach(async ({ page }) => {
    userLogin = new UserLogin(page);
  });
  validUsers.forEach((user) => {
    test(`Validate ${user.name} login`, async ({ }) => {
      await userLogin.fillInLogin(user.name, user.password);
    });
  });
});

test.describe("Validate unsuccessfull logins", () => {
  let userLogin;
  test.beforeEach(async ({ page }) => {
    userLogin = new UserLogin(page);
  });
  invalidUsers.forEach((user) => {
    test(`Validate ${user.title} login`, async ({ }) => {
      await userLogin.fillInLogin(user.title, user.password);
    });
  });
});