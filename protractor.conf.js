// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js
/* globals browser */
const config = require('./tests/lib/config');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const protractorConfig = {
  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.
  allScriptsTimeout: 110000,
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: config.test_env.baseURL,
  // chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.46',
  // If true, only chromedriver will be started, not a standalone selenium.
  // Tests for browsers other than chrome will not run.
  directConnect: true,

  // list of files / patterns to load in the browser
  specs: [
    'tests/base*.spec.js'
  ],
  // Patterns to exclude.
  exclude: [],
  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  maxSessions: 1,
  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine',

  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  onPrepare: function () {
    browser.driver.sleep(1000);
    jasmine.getEnv().addReporter(
      new SpecReporter({
      // Defaults: https://github.com/bcaudan/jasmine-spec-reporter#default-options
      // Configuration: https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
        suite: {
          displayNumber: true
        },
        spec: {
          displayPending: true,
          displayDuration: true
        },
        summary: {
          displaySuccesses: false, // display summary of all successes after execution
          displayFailed: false, // display summary of all failures after execution
          displayPending: false  // display summary of all pending specs after execution
        }
      })
    );
  }
};

protractorConfig.multiCapabilities = [/* {
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-sync',
        '--no-first-run',
        // "--user-data-dir=./tmp/chrome",
        // "--remote-debugging-port=9222",
        '--window-size=800,600',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--autoplay-policy=no-user-gesture-required',
        '--allow-file-access-from-files',
        '--disable-web-security',
        '--disable-infobars',
        '--disable-extensions'
      ],
      prefs: {
        'media.navigator.permission.disabled': true,
        'media.navigator.streams.fake': true
      }
    }
  }, */{
    loggingPrefs: {
      browser: 'WARNING' // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
    },
    browserName: 'chrome',
    unexpectedAlertBehaviour: 'accept',
    chromeOptions: {
      args: [
        // '--headless',
        '--no-sandbox',
        // '--disable-gpu',
        '--disable-sync',
        '--no-first-run',
        // "--user-data-dir=./tmp/chrome",
        // "--remote-debugging-port=9222",
        '--window-size=800,600',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--autoplay-policy=no-user-gesture-required',
        '--allow-file-access-from-files',
        '--disable-web-security',
        '--disable-infobars',
        '--disable-extensions'
      ],
      prefs: {
        VideoCaptureAllowedUrls: ['*'],
        'profile.default_content_setting_values.media_stream_mic': 1,
        'profile.default_content_setting_values.media_stream_camera': 1,
        'profile.default_content_setting_values.geolocation': 1,
        'profile.default_content_setting_values.notifications': 1
      }
    }
  }];

exports.config = protractorConfig;
