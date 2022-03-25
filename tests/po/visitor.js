const { browser, element, by } = require('protractor');
const Page = require('./page');
const log = require('../lib/logger');
const util = require('protractor-beautiful-reporter/app/util');
const until = browser.ExpectedConditions;
class Visitor extends Page {
  constructor () {
    super();
    this.tennantId = '';
  }

  get localvideo () { return element(by.id('localVideo' + this.tennantId)); }
  get joinConferenceButton () { return element(by.id('joinConferenceButton')); }

  async localVideoStarted () {
    return browser.wait(until.visibilityOf(element(by.id('localVideo' + this.tennantId))), global.TIMEOUT, 'Visitor localVideo does not became available in ' + global.TIMEOUT + 's');
  }

  async remoteVideoStarted () {
    return browser.wait(until.visibilityOf(element(by.id('remoteVideo' + this.tennantId))), global.TIMEOUT, 'Visitor remoteVideo does not became available in ' + global.TIMEOUT + 's');
  }

  async precallStarted () {
    return browser.wait(until.elementToBeClickable(element(by.id('joinConferenceButton'))), global.TIMEOUT, 'Visitor join precall button does not became available in ' + global.TIMEOUT + 's');
  }

  constructUrlC2V (confObject, sessionId) {
    const str = {
      video_on: false,
      sessionId: sessionId,
      hideChat: true,
      type: 'initial',
      defaultGroup: 'floor',
      view_widget: '4',
      offline: true,
      aa: true,
      skip_private: true,
      inichat: 'false',
      // pcfl: true,
      locale: 'en_US'
    };

    this.tennantId = confObject.tennantId;
    const encodedTenant = Buffer.from(confObject.tennantId).toString('base64');
    const encodedParam = Buffer.from(JSON.stringify(str)).toString('base64');
    const popUpUrl = confObject.baseURL + '/static/popup.html';
    const paramsObj = { tennantId: encodedTenant, params: encodedParam };
    // URLSearchParams should not be used, since it url encode base64
    const searchParams = new URLSearchParams(paramsObj);
    const constructedUrl = popUpUrl + '?tennantId=' + encodedTenant + '&params=' + encodedParam;
    return constructedUrl;
  }

  async shortUrlExpanded () {
    return browser.wait(until.urlContains(Buffer.from(this.tennantId).toString('base64')), global.TIMEOUT,
      'cannot validate shorturl redirection url in ' + global.TIMEOUT + ' sec');
  }

  async redirectedTo (redirectUrl) {
    return browser.wait(until.urlIs(redirectUrl), global.TIMEOUT, 'Visitor URL not ' + redirectUrl + ' in ' + global.TIMEOUT + 's');
  }

  async inWaitingState () {
    const waitingState = until.visibilityOf(element(by.id('wd-widget-content-video-waiting' + this.tennantId)));
    return browser.wait(waitingState, global.TIMEOUT, 'waiting to connect state missing for ' + global.TIMEOUT + ' sec');
  }

  async waitingToConnectOrAgent () {
    const errorMsg = until.visibilityOf(element(by.id('error_message' + this.tennantId)));
    const waitingState = until.visibilityOf(element(by.id('wd-widget-content-video-waiting' + this.tennantId)));
    return browser.wait(until.or(errorMsg, waitingState), 10000, 'waiting to connect or waiting for agent fails in ' + global.TIMEOUT + 's');
  }

  async hasErrorMessageWithText (hangup_text = 'Hang on tight!') {
    return await browser.wait(until.visibilityOf(element(by.id('error_message' + this.tennantId))), global.TIMEOUT, 'No error error_message in ' + global.TIMEOUT + 's');
  }
}
module.exports = Visitor;
