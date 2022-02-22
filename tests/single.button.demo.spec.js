/* globals beforeEach beforeAll describe it afterEach */

const { browser } = require('protractor');
const log = require('./lib/logger');
const common = require('./lib/common');
const config = require('./lib/config');
const assert = require('assert');
log.init(config.logger);

const TIMEOUT = 1000 * 5 * 10; // 50 sec

describe('single page demo', function () {
  afterEach(async function () {
    await browser.driver.sleep(500);
  });

  beforeAll(function () {
    // empty
  });

  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  // single page demo
  it('should establish the call and finish the call', function () {
    log.debug('Establish Connection');
    return common.establishConnection()
      .then(function () {
        log.debug('join Call');
        return common.joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return common.validateConnection();
      })
      .then(function () {
        log.debug('Finish Call');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  });
}, TIMEOUT);
