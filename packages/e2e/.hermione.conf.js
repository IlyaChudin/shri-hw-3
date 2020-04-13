module.exports = {
  baseUrl: "http://localhost:3000/",
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    }
  },
  sets: {
    common: {
      files: "tests/**/*.js"
    }
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true
    }
  }
};
