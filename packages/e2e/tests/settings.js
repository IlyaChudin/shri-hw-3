/* eslint-disable func-names */
require("dotenv").config({ path: "../../.env.test" });
const { assert } = require("chai");
const { deleteSettings } = require("../../server/src/backendApi");

describe("settings page", () => {
  beforeEach(async () => {
    await deleteSettings();
  });

  afterEach(async () => {
    await deleteSettings();
  });

  it("should save settings and redirect to builds list", function() {
    return this.browser
      .url("/settings")
      .waitForVisible('[name="repoName"]', 5000)
      .element('[name="repoName"]')
      .setValue("IlyaChudin/ci-test")
      .element('[name="mainBranch"]')
      .setValue("master")
      .element('[name="buildCommand"]')
      .setValue("npm run build")
      .element('[name="period"]')
      .setValue("10")
      .click('[type="submit"]')
      .waitForExist(".build-list", 5000)
      .isExisting(".build-list")
      .then(exists => assert.ok(exists, "build list not shown"));
  });

  it("should display error when repository not found", function() {
    return this.browser
      .url("/settings")
      .waitForVisible('[name="repoName"]', 5000)
      .element('[name="repoName"]')
      .setValue("IlyaChudin/ci-test2")
      .element('[name="mainBranch"]')
      .setValue("master")
      .element('[name="buildCommand"]')
      .setValue("npm run build")
      .element('[name="period"]')
      .setValue("10")
      .click('[type="submit"]')
      .waitForVisible(".form__error", 5000)
      .element(".form__error")
      .getText()
      .then(text => assert.equal(text, "Repository not found", "invalid error message"));
  });
});
