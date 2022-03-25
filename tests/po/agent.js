const { browser, element, by } = require('protractor');
const  Page = require('./page.js');
const log = require('../lib/logger');
const until = browser.ExpectedConditions;
const dbAPI = require('../lib/dbAPI');
const veUtil = require('../lib/veUtil');
class Agent extends Page  {
  constructor() {
    super();
  }

  // buttons
  get hangup () { return element(by.id('hangupButton'));}
  get confirm () { return element(by.id('confirmDismissBtn'));}
  get startVideo () {return element(by.id('startVideoButton'));}
  // elements
  get localvideo () { return element(by.id('localVideo'));}
  get videoPreview () { return element(by.id('videoPreview'));}

  setVisitorId = async function (visitorId) {
    await browser.executeScript('window.jsVeInitClb = function () {_videoengager.startVideoVisitor("' + visitorId + '");} ');
  };
  localVideoStarted = async function () {
    return browser.wait(until.visibilityOf(element(by.id('localVideo'))), global.TIMEOUT, 'Agent localvideo not available in ' + global.TIMEOUT + 's');
  };
  remoteVideoStarted = async function () {
    return browser.wait(until.visibilityOf(element(by.id('remoteVideo'))), global.TIMEOUT, 'Remote Video not available in ' + global.TIMEOUT + 's');
  };
  previewVideoStarted = async function () {
    return browser.wait(until.visibilityOf(element(by.id('videoPreview'))), global.TIMEOUT, 'Preview video not available in ' + global.TIMEOUT + 's');
  };
  hasSrcObject = function() {
    return element(by.id('localVideo')).getAttribute('srcObject');
  };
  startVideoClickable = async function () {
    return browser.wait(until.elementToBeClickable(element(by.id('startVideoButton'))), global.TIMEOUT, 'startVideoButton not available in ' + global.TIMEOUT + 's');
  };
  getCloudUrl = function () {
    return browser.driver.wait(function () {
      return browser.driver.executeScript('return (window.getVeContext().cloudUrl)');
    }, global.TIMEOUT, 'get shorturl within ' + global.TIMEOUT + ' seconds');
  };
  configureAgentWithJS = async function (confObject, sessionId) {
    // {\'pak\':"' + config.test_env.pak + '", \'externalId\':"' + config.test_env.externalId + '"}
    const confPartnerOrg = {
      pak: confObject.pak,
      externalId: confObject.externalId
    };
    const confUsr = {
      firstName: confObject.firstName,
      lastName: confObject.lastName,
      email: confObject.email,
      userName: 't'
    };
    const confVisitor = {};
    const confOptions = {
      hideChat: true,
      hideInfo: true
    };
    const initString = JSON.stringify(confPartnerOrg) +
    ',' + JSON.stringify(confUsr) +
    ',' + JSON.stringify(confVisitor) +
    ',' + JSON.stringify(confOptions);
    log.debug('Conf string:' + initString);
    if (sessionId) {
      await this.setVisitorId(sessionId);
    }
    await browser.executeScript('_videoengager.init(' + initString + ');');
  };

  /**
   * generate an agent url from given configuration
   * @param {string} sessionId visitor session id
   * @param {string} mode inbound and outbound connections
   * @param {string} conferenceId same visitor and agent conferance id for 3 way call
   * @param {string} pin same visitor and agent pin code
   * @returns {string} agent url with configurations in url paramters
   */
  async createAgentUrlWithJS (token, confObject, sessionId, mode = 'inbound', conferenceId, pin) {
    const params = {
      params: veUtil.strToBase64('{"locale":"en_US"}'),
      interaction: 1,
      token: token,
      sk: true,
      isPopup: false
    };
    if (mode === 'inbound'){
      params.invitationId = sessionId;
    } else {
      params.transferId = sessionId;
      params.conferenceId = conferenceId;
      params.pin = pin;
    }
    return `${confObject.baseURL}/static/agent.popup.cloud.html?${veUtil.generateUrlParamters(params)}`;
  }

  /**
   * @returns {string} agent url for configured server
   */
  constructUrl (confObject) {
    log.debug('using config object:' + JSON.stringify(confObject));
    return confObject.baseURL + '/static/agent.popup.cloud.html';
  }
}
module.exports = Agent;
