/* globals beforeEach beforeAll describe it afterEach */

const { browser } = require('protractor');
const log = require('./lib/logger');
const common = require('./lib/common');
const config = require('./lib/config');
const assert = require('assert');
log.init(config.logger);

const TIMEOUT = 1000 * 5 * 10; // 50 sec

describe('blur settings test', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  afterEach(async function () {
    await browser.driver.sleep(500);
  });

  beforeAll(function () {
    return common.getToken()
      .then(function () {
        return common.setDefaultDB();
      });
  });

  it('enable consent text', function () {
    return common.enableConsent()
      .then(function () {
        return common.establishInboundConnection(true, false);
      })
      .then(function () {
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        return common.validateConnection();
      })
      .then(function () {
        return common.verifyBranding();
      })
      .then(function (consent) {
        assert.equal(true, consent, 'consent should be exist');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  }, TIMEOUT);

  it('disable consent text', function () {
    return common.disableConsent()
      .then(function () {
        return common.establishInboundConnection(true, false);
      })
      .then(function () {
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        return common.validateConnection();
      })
      .then(function () {
        return common.verifyConsentNotExist();
      })
      .then(function (consent) {
        assert.equal(true, consent, 'consent should not be exist');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  }, TIMEOUT);

  it('remove consent', function () {
    return common.removeConsent()
      .then(function () {
        return common.establishInboundConnection(true, false);
      })
      .then(function () {
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        return common.validateConnection();
      })
      .then(function () {
        return common.verifyConsentNotExist();
      })
      .then(function (consent) {
        assert.equal(true, consent, 'consent should not be exist');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  }, TIMEOUT);
});
