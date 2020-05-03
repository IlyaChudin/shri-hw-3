/* eslint-disable func-names,import/no-extraneous-dependencies */
require("dotenv").config({ path: "../../.env.test" });
const { deleteSettings, saveSettings, requestBuild } = require("../../server/build/backendApi");

describe("builds page", () => {
  beforeEach(async () => {
    await deleteSettings();
    await saveSettings({
      repoName: "IlyaChudin/ci-test",
      buildCommand: "npm ci",
      mainBranch: "master",
      period: 100
    });
  });

  afterEach(async () => {
    await deleteSettings();
  });

  it("should run new build from modal window", function() {
    return this.browser
      .url("/")
      .waitForVisible(".header__button .icon_type_play", 5000)
      .click(".header__button .icon_type_play")
      .waitForVisible(".new-build-form")
      .setValue('[name="hash"]', "0cab04f6b0894e775e66224469fde0309f8eb284")
      .setValue('[name="branch"]', "master")
      .click('[type="submit"]')
      .waitForVisible(".build-card_view_details", 5000);
  });

  it("should show error in new build dialog", function() {
    return this.browser
      .url("/")
      .waitForVisible(".header__button .icon_type_play", 5000)
      .click(".header__button .icon_type_play")
      .waitForVisible(".new-build-form")
      .setValue('[name="hash"]', "1234")
      .setValue('[name="branch"]', "master")
      .click('[type="submit"]')
      .waitForVisible(".form__error", 5000);
  });

  it("should show list of builds", async function() {
    const build = {
      commitHash: "5d397611d3e72a975a44edb8e1fb94e2a7d9559a",
      branchName: "master",
      authorName: "Ilya Chudin",
      commitMessage: "test master update"
    };
    await requestBuild(build);
    await requestBuild(build);
    return this.browser
      .url("/")
      .waitForVisible(".build-card", 5000)
      .assertView("plain", ".build-list");
  });
});
