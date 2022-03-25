/* globals beforeEach beforeAll describe it afterEach */

const { browser } = require('protractor');
const log = require('./lib/logger');
const common = require('./lib/common');
const config = require('./lib/config');
const assert = require('assert');

const TIMEOUT = 1000 * 5 * 10; // 50 sec

describe('inbound call', function () {
  afterEach(function () {
    // empty
  });

  beforeAll(function () {
    return common.getToken()
      .then(function () {
        return common.setDefaultDB();
      });
  });

  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  it('should establish the call and finish the call', function () {
    log.debug('Establish Connection');
    return common.establishOutboundConnection()
      .then(function () {
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        return common.validateConnection();
      })
      .then(function () {
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.terminateCall();
      });
  });
}, TIMEOUT, 'test timeout');
