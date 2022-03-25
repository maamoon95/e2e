/* globals beforeEach beforeAll describe it afterEach */

const { browser } = require('protractor');
const log = require('./lib/logger');
const common = require('./lib/common');
const config = require('./lib/config');
const assert = require('assert');

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
    log.info('blur settings test');
    return common.getToken()
      .then(function () {
        return common.setDefaultDB();
      });
  });

  it('should enable blur', function () {
    return common.setBlur(true)
      .then(function () {
        log.debug('Establish Connection');
        return common.establishInboundConnection(true, false);
      })
      .then(function () {
        log.debug('join Call');
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        log.debug('validate Connection');
        return common.validateConnection();
      })
      .then(function () {
        log.debug('verify blur on');
        return common.isBlurOn();
      })
      .then(function (blur) {
        log.debug('blur: ', blur);
        assert.equal(true, blur);
        log.debug('Finish Call');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  }, TIMEOUT);

  it('should disable blur', function () {
    return common.setBlur(false)
      .then(function () {
        log.debug('Establish Connection');
        return common.establishInboundConnection(true, false);
      })
      .then(function () {
        log.debug('join Call');
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        log.debug('validate Connection');
        return common.validateConnection();
      })
      .then(function () {
        log.debug('verify blur on');
        return common.isBlurOn();
      })
      .then(function (blur) {
        log.debug('blur: ', blur);
        assert.equal(false, blur);
        log.debug('Finish Call');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  }, TIMEOUT);

  it('should remove blur', function () {
    return common.setBlur()
      .then(function () {
        log.debug('Establish Connection');
        return common.establishInboundConnection(true, false);
      })
      .then(function () {
        log.debug('join Call');
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        log.debug('validate Connection');
        return common.validateConnection();
      })
      .then(function () {
        log.debug('verify blur on');
        return common.isBlurOn();
      })
      .then(function (blur) {
        log.debug('blur: ', blur);
        assert.equal(false, blur);
        log.debug('Finish Call');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  }, TIMEOUT);
});
