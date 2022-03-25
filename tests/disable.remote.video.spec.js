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

  it('should verify safety not enabled', function () {
    return common.setSafety(false, true)
      .then(function (profile) {
        assert.equal(false, profile.data.safety.enable, 'db is not changed');
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
        log.debug('check agent safety disabled');
        return common.isSafetyDisabled();
      })
      .then(function (buttonDiasabled) {
        assert.equal(true, buttonDiasabled, 'safety button is visible');
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  }, TIMEOUT);

  it('should verify safety enabled, remote stream not exist', function () {
    return common.setSafety(true, true)
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
        log.debug('check safety enability');
        return common.isSafetyEnabled();
      })
      .then(function (buttonEnabled) {
        assert.equal(true, buttonEnabled);
        return common.sleep(1000);
      })
      .then(function () {
        log.debug('check agent remote Video existance');
        return common.isRemoteVideoDisabled();
      })
      .then(function (remoteVideoStreamDisabled) {
        log.debug('remote video stream disabled: ', remoteVideoStreamDisabled);
        assert.equal(true, remoteVideoStreamDisabled);
        return common.isSafetyVisualsSet();
      })
      .then(function (safetyVisuals) {
        log.debug('safety visuals: ', safetyVisuals);
        assert.equal(true, safetyVisuals);
        return common.switchRemoteVideoDisability();
      })
      .then(function () {
        log.debug('remote video enabled');
        return common.isRemoteVideoEnabled();
      })
      .then(function (remoteVideoStreamEnabled) {
        log.debug('remote video stream enabled: ', remoteVideoStreamEnabled);
        assert.equal(true, remoteVideoStreamEnabled);
        return common.isSafetyVisualsSet();
      })
      .then(function (safetyVisuals) {
        log.debug('safety visuals: ', safetyVisuals);
        assert.equal(false, safetyVisuals);
        return common.switchRemoteVideoDisability();
      })
      .then(function () {
        log.debug('remote video enabled');
        return common.isRemoteVideoDisabled();
      })
      .then(function (remoteVideoStreamDisabled) {
        log.debug('remote video stream disabled: ', remoteVideoStreamDisabled);
        assert.equal(true, remoteVideoStreamDisabled);
        return common.isSafetyVisualsSet();
      })
      .then(function (safetyVisuals) {
        log.debug('safety visuals: ', safetyVisuals);
        assert.equal(true, safetyVisuals);
        return common.finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return common.finishCall();
      });
  }, TIMEOUT);
});
