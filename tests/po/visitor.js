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
    return browser.wait(until.visibilityOf(element(by.id('localVideo' + this.tennantId))), 20000, 'Visitor localVideo does not became available in 20s');
  }

  async remoteVideoStarted () {
    return browser.wait(until.visibilityOf(element(by.id('remoteVideo' + this.tennantId))), 20000, 'Visitor remoteVideo does not became available in 20s');
  }

  async precallStarted () {
    return browser.wait(until.elementToBeClickable(element(by.id('joinConferenceButton'))), 20000, 'Visitor join precall button does not became available in 20s');
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

  async verifyRedirect (redirectUrl) {
    return browser.wait(async function () {
      const currentUrl = await browser.getCurrentUrl();
      if (currentUrl === redirectUrl) {
        return true;
      }
      return false;
    }, 30000, 'cannot validate redirect url in 5 sec');
  }

  async verifyShortURLRedirect (confObject) {
    const INVALID_URL = 'https://www.videoengager.com/invalid-url/';
    const popUpUrl = confObject.baseURL + '/static/popup.html';
    return browser.wait(async function () {
      const currentUrl = await browser.getCurrentUrl();
      if (currentUrl.indexOf(popUpUrl) !== -1) {
        return true;
      }
      if (currentUrl.indexOf(INVALID_URL) !== -1) {
        throw Error('shorturl not found, redirected to invalid url page');
      }
      return false;
    }, 30000, 'cannot validate shorturl redirection url in 30 sec');
  }
}
module.exports = Visitor;
