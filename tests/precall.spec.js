/* globals beforeEach beforeAll describe it afterEach */

const { browser } = require('protractor');
const log = require('./lib/logger');
const common = require('./lib/common');
const config = require('./lib/config');
const assert = require('assert');
log.init(config.logger);

const TIMEOUT = 1000 * 5 * 10; // 50 sec

describe('precall', function () {
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

  it('visitor should connect without precall', function () {
    return common.setPrecall(false)
      .then(function () {
        log.debug('Establish Connection');
        return common.establishInboundConnection(true);
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
        log.debug('Finish Call');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.terminateCall();
      });
  });

  it('visitor should connect from precall', function () {
    return common.setPrecall(true)
      .then(function () {
        log.debug('Establish Connection');
        return common.establishInboundConnection(true);
      })
      .then(function () {
        log.debug('verify join conferance button is exists and click it');
        return common.joinVisitorPrecall();
      })
      .then(function () {
        log.debug('verify agent join by chat token');
        return common.callEstablishedByChatToken();
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
        return common.terminateCall();
      });
  });
}, TIMEOUT);
