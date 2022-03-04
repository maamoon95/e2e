const { browser, element, by } = require('protractor');
const Page = require('./page');
const log = require('../lib/logger');
const util = require('protractor-beautiful-reporter/app/util');
const until = browser.ExpectedConditions;
class Visitor extends Page {

  constructor() {
    super();
    this.tennantId = '';
  }

  get localvideo () { return element(by.id('localVideo'+this.tennantId))}

  localVideoStarted = async function () {
    return browser.wait(until.visibilityOf(element(by.id('localVideo' + this.tennantId))), 20000, 'Visitor localVideo does not became available in 20s');
  };

  remoteVideoStarted = async function () {
       return browser.wait(until.visibilityOf(element(by.id('remoteVideo' + this.tennantId))), 20000, 'Visitor remoteVideo does not became available in 20s');
  };
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
      "locale":"en_US"
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
  };
}
module.exports =  Visitor;
