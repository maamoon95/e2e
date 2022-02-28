const { browser, element, by } = require('protractor');
const  Page = require('./page.js');
const log = require('../lib/logger');
const until = browser.ExpectedConditions;

/**
 *
 confobject: {
    pak: 'DEV2',
    externalId: 'videoEngager',
    firstName: 'name',
    lastName: 'last',
    email: 't@t',
    password: '1',
    userName: 't',
    id: '123',
    subject: 'subj',
    hideChat: true,
    hideInfo: true,
    baseURL: 'https://dev.videoengager.com',
    organizationId: '327d10eb-0826-42cd-89b1-353ec67d33f8',
    deploymentId: 'c2eaaa5c-d755-4e51-9136-b5ee86b92af3',
    tennantId: 'test_tenant',
    environment: 'https://api.mypurecloud.com.au',
    queue: 'video'
  },
 */
class Agent extends Page  {
  get hangup () { return element(by.id('hangupButton'));}
  get confirm () { return element(by.id('confirmDismissBtn'));}
  get localvideo () { return element(by.id('localVideo'))}
  constructUrl = function (confobject) {
    log.debug('using config object:' + JSON.stringify(confobject));
    return confobject.baseURL + '/static/agent.popup.cloud.html';
  // body...
  };
  setVisitorId = async function (visitorId) {
    await browser.executeScript('window.jsVeInitClb = function () {_videoengager.startVideoVisitor("' + visitorId + '");} ');
  };
  localVideoStarted = async function () {
    return browser.wait(until.visibilityOf(element(by.id('localVideo'))), 30000, 'Agent localvideo not available in 30s');
  };
  remoteVideoStarted = async function () {
       return browser.wait(until.visibilityOf(element(by.id('remoteVideo'))), 5000, 'Remote Video not available in 5s');
  };  
  hasSrcObject = function() {
    return element(by.id('localVideo')).getAttribute('srcObject');
  };
  configureAgentWithJS = async function (confobject, sessionId) {
    // {\'pak\':"' + config.test_env.pak + '", \'externalId\':"' + config.test_env.externalId + '"}
    const confPartnerOrg = {
      pak: confobject.pak,
      externalId: confobject.externalId
    };
    const confUsr = {
      firstName: confobject.firstName,
      lastName: confobject.lastName,
      email: confobject.email,
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
}

module.exports = Agent;
