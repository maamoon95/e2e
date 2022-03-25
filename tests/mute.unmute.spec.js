/* global it describe afterEach beforeEach beforeAll  */
const { browser } = require('protractor');
const log = require('./lib/logger');
const common = require('./lib/common');
const config = require('./lib/config');
const assert = require('assert');
const TIMEOUT = 1000 * 5 * 10;

describe('disable remote video test', function () {
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

  it('should mute and unmute agent', function () {
    common.establishInboundConnection(true, false)
      .then(function () {
        log.debug('join Call');
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        log.debug('validate Connection');
        return common.validateConnection();
      })
      .then(function () {
        log.debug('mute agent');
        return common.muteAgent(true);
      })
      .then(function () {
        return common.isAgentButtonMuted();
      })
      .then(function (mute) {
        assert.equal(true, mute, 'agent icon must be on muted state');
        return common.muteAgent(false);
      })
      .then(function () {
        return common.isAgentButtonMuted();
      })
      .then(function (mute) {
        assert.equal(false, mute, 'agent icon must be on unmuted state');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  });

  it('should mute and unmute visitor', function () {
    common.establishInboundConnection(true, false)
      .then(function () {
        log.debug('join Call');
        return common.verifyJoinWithoutPrecall();
      })
      .then(function () {
        log.debug('validate Connection');
        return common.validateConnection();
      })
      .then(function () {
        log.debug('mute visitor');
        return common.muteVisitor(true);
      })
      .then(function () {
        return common.isVisitorButtonMuted();
      })
      .then(function (mute) {
        assert.equal(true, mute, 'visitor icon must be on muted state');
        return common.muteVisitor(false);
      })
      .then(function () {
        return common.isVisitorButtonMuted();
      })
      .then(function (mute) {
        assert.equal(false, mute, 'visitor icon must be on unmuted state');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  });
}, TIMEOUT);
